'use client';

import { useState } from 'react';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  label: string;
}

interface ContrastResult {
  color1: string;
  color2: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
}

interface ColorBlindSimulation {
  protanopia: string; // Red-blind
  deuteranopia: string; // Green-blind
  tritanopia: string; // Blue-blind
  achromatopsia: string; // Complete color blindness
}

const PRESET_PALETTES = {
  'RBG Data Teal': {
    colors: ['#174F5B', '#D6A84B', '#E56B52', '#25282A'],
    description: 'RBG Data brand palette'
  },
  'Accessible Sequential': {
    colors: ['#e7f4f5', '#b3d9e1', '#7eb3cc', '#4682a9', '#1e4d7b'],
    description: 'Safe for color blindness, works in grayscale'
  },
  'Okabe-Ito (Color-Blind Safe)': {
    colors: ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'],
    description: 'Scientifically optimized for all color vision types'
  },
  'Grayscale': {
    colors: ['#ffffff', '#cccccc', '#999999', '#666666', '#000000'],
    description: 'Universal accessibility baseline'
  },
};

export default function ColorPaletteHelper() {
  const [colors, setColors] = useState<Color[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [showColorInput, setShowColorInput] = useState(false);
  const [contrastResults, setContrastResults] = useState<ContrastResult[]>([]);
  const [colorBlindResults, setColorBlindResults] = useState<Record<string, ColorBlindSimulation>>({});

  // Parse hex or RGB color
  const parseColor = (input: string): Color | null => {
    const trimmed = input.trim();
    
    // Hex format
    const hexMatch = trimmed.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    if (hexMatch) {
      const hex = '#' + hexMatch[1];
      const rgb = hexToRgb(hex);
      if (rgb) {
        return {
          hex,
          rgb,
          label: hex.toUpperCase(),
        };
      }
    }

    // RGB format - rgb(r, g, b)
    const rgbMatch = trimmed.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        return {
          hex: rgbToHex(r, g, b),
          rgb: { r, g, b },
          label: `rgb(${r}, ${g}, ${b})`,
        };
      }
    }

    return null;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()
    );
  };

  // Calculate luminance (for contrast ratio)
  const getLuminance = (rgb: { r: number; g: number; b: number }): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Calculate contrast ratio
  const getContrastRatio = (rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number => {
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Simulate color blindness
  const simulateColorBlindness = (rgb: { r: number; g: number; b: number }): ColorBlindSimulation => {
    const { r, g, b } = rgb;

    // Protanopia (red-blind) simulation
    const protanopia = rgbToHex(
      Math.round(0.567 * r + 0.433 * g),
      Math.round(0.558 * r + 0.442 * g),
      Math.round(0.242 * g + 0.758 * b)
    );

    // Deuteranopia (green-blind) simulation
    const deuteranopia = rgbToHex(
      Math.round(0.625 * r + 0.375 * g),
      Math.round(0.7 * r + 0.3 * g),
      Math.round(0.3 * g + 0.7 * b)
    );

    // Tritanopia (blue-blind) simulation
    const tritanopia = rgbToHex(
      Math.round(0.95 * r + 0.05 * b),
      Math.round(0.433 * r + 0.567 * g),
      Math.round(0.475 * g + 0.525 * b)
    );

    // Achromatopsia (complete color blindness - grayscale)
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const achromatopsia = rgbToHex(gray, gray, gray);

    return { protanopia, deuteranopia, tritanopia, achromatopsia };
  };

  const handleAddColors = () => {
    if (!inputValue.trim()) return;

    const colorStrings = inputValue.split(',').map((c) => c.trim());
    const parsedColors = colorStrings
      .map(parseColor)
      .filter((c) => c !== null) as Color[];

    if (parsedColors.length > 0) {
      const newColors = [...colors, ...parsedColors];
      setColors(newColors);
      setInputValue('');
      analyzeColors(newColors);
    }
  };

  const handleLoadPreset = (presetKey: string) => {
    const preset = PRESET_PALETTES[presetKey as keyof typeof PRESET_PALETTES];
    if (preset) {
      const parsedColors = preset.colors
        .map(parseColor)
        .filter((c) => c !== null) as Color[];
      setColors(parsedColors);
      analyzeColors(parsedColors);
      setSelectedPreset(presetKey);
    }
  };

  const analyzeColors = (palette: Color[]) => {
    // Calculate all contrast ratios
    const contrasts: ContrastResult[] = [];
    for (let i = 0; i < palette.length; i++) {
      for (let j = i + 1; j < palette.length; j++) {
        const ratio = getContrastRatio(palette[i].rgb, palette[j].rgb);
        contrasts.push({
          color1: palette[i].hex,
          color2: palette[j].hex,
          ratio: parseFloat(ratio.toFixed(2)),
          wcagAA: ratio >= 4.5,
          wcagAAA: ratio >= 7,
        });
      }
    }
    setContrastResults(contrasts.sort((a, b) => b.ratio - a.ratio));

    // Simulate color blindness
    const simulations: Record<string, ColorBlindSimulation> = {};
    palette.forEach((color) => {
      simulations[color.hex] = simulateColorBlindness(color.rgb);
    });
    setColorBlindResults(simulations);
  };

  const clearPalette = () => {
    setColors([]);
    setContrastResults([]);
    setColorBlindResults({});
    setSelectedPreset('');
  };

  const exportAsCSV = (format: 'hex' | 'rgb') => {
    const values = colors
      .map((c) =>
        format === 'hex' ? c.hex : `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`
      )
      .join(', ');
    return values;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <section className="section-hero bg-cream">
        <div className="container-max">
          <h1 className="text-teal mb-4">Color Palette Helper</h1>
          <p className="text-lg text-charcoal">
            Test your color palettes for accessibility. Check contrast ratios, simulate color blindness, and export ready for Tableau.
          </p>
          <div className="w-16 h-1 bg-coral mt-6"></div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="palette-input-section">
              <h2 className="text-xl font-bold text-teal mb-4">Add Colors</h2>

              {/* Presets */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Quick Start with Presets
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(PRESET_PALETTES).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => handleLoadPreset(key)}
                      className={`text-left p-3 rounded border-2 transition-all ${
                        selectedPreset === key
                          ? 'border-teal bg-teal bg-opacity-10'
                          : 'border-gray-300 hover:border-teal'
                      }`}
                    >
                      <div className="font-semibold text-charcoal">{key}</div>
                      <div className="text-sm text-gray-600">{preset.description}</div>
                      <div className="flex gap-1 mt-2">
                        {preset.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Or Add Your Own Colors
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Paste hex or RGB values separated by commas. Examples: #174F5B, #FFF, rgb(200, 50, 100)
                </p>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="#174F5B, #D6A84B, rgb(232, 107, 82)"
                  className="w-full p-3 border-2 border-gray-300 rounded focus:border-teal focus:outline-none text-sm"
                  rows={3}
                />
                <button
                  onClick={handleAddColors}
                  className="mt-3 px-4 py-2 bg-teal text-white rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Add Colors
                </button>
              </div>

              {/* Current Palette */}
              {colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Current Palette ({colors.length} colors)
                  </label>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {colors.map((color) => (
                      <div key={color.hex} className="relative group">
                        <div
                          className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer hover:border-coral transition"
                          style={{ backgroundColor: color.hex }}
                          title={color.hex}
                        />
                        <button
                          onClick={() =>
                            setColors(colors.filter((c) => c.hex !== color.hex))
                          }
                          className="absolute -top-2 -right-2 bg-coral text-white rounded-full w-5 h-5 text-xs hidden group-hover:block"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Export Options */}
                  <div className="bg-cream p-4 rounded mb-4">
                    <p className="text-xs font-semibold text-charcoal mb-2">Export for Tableau</p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={exportAsCSV('hex')}
                          readOnly
                          className="text-xs p-2 bg-white border border-gray-300 rounded flex-1"
                        />
                        <button
                          onClick={() => copyToClipboard(exportAsCSV('hex'))}
                          className="px-2 py-1 bg-teal text-white text-xs rounded hover:bg-opacity-90"
                        >
                          Copy Hex
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={exportAsCSV('rgb')}
                          readOnly
                          className="text-xs p-2 bg-white border border-gray-300 rounded flex-1"
                        />
                        <button
                          onClick={() => copyToClipboard(exportAsCSV('rgb'))}
                          className="px-2 py-1 bg-teal text-white text-xs rounded hover:bg-opacity-90"
                        >
                          Copy RGB
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={clearPalette}
                    className="w-full px-3 py-2 border-2 border-coral text-coral rounded font-semibold hover:bg-coral hover:bg-opacity-10 transition"
                  >
                    Clear Palette
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Section */}
            {colors.length > 0 && (
              <div className="palette-analysis-section">
                <h2 className="text-xl font-bold text-teal mb-4">Palette Analysis</h2>

                {/* Contrast Summary */}
                <div className="mb-6">
                  <h3 className="font-semibold text-charcoal mb-3">Contrast Ratios</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {contrastResults.length > 0 ? (
                      contrastResults.map((result, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 rounded border-l-4 border-gray-300"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: result.color1 }}
                            />
                            <span className="text-xs text-gray-600">vs</span>
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: result.color2 }}
                            />
                            <span className="text-xs font-mono text-charcoal flex-1">
                              {result.ratio}:1
                            </span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            {result.wcagAAA && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                                WCAG AAA
                              </span>
                            )}
                            {result.wcagAA && !result.wcagAAA && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                WCAG AA
                              </span>
                            )}
                            {!result.wcagAA && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                                Needs Work
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">Add at least 2 colors to see contrast results.</p>
                    )}
                  </div>
                </div>

                {/* Accessibility Notes */}
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Accessibility Tips</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• WCAG AAA (7:1) is best for text</li>
                    <li>• WCAG AA (4.5:1) is minimum for accessibility</li>
                    <li>• Check color blindness simulations below</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Color Blindness Simulations */}
          {colors.length > 0 && Object.keys(colorBlindResults).length > 0 && (
            <div className="palette-colorblind-section">
              <h2 className="text-xl font-bold text-teal mb-6">Color Blindness Simulations</h2>
              <p className="text-sm text-gray-700 mb-6">
                How your palette appears to people with different types of color vision deficiency.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Normal Vision</h3>
                  <div className="flex gap-2 mb-3">
                    {colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex-1 h-16 rounded border-2 border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">Original colors</div>
                </div>

                {/* Protanopia */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Protanopia (Red-Blind)</h3>
                  <div className="flex gap-2 mb-3">
                    {colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex-1 h-16 rounded border-2 border-gray-300"
                        style={{
                          backgroundColor:
                            colorBlindResults[color.hex]?.protanopia || color.hex,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    ~1% of males affected
                  </div>
                </div>

                {/* Deuteranopia */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Deuteranopia (Green-Blind)</h3>
                  <div className="flex gap-2 mb-3">
                    {colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex-1 h-16 rounded border-2 border-gray-300"
                        style={{
                          backgroundColor:
                            colorBlindResults[color.hex]?.deuteranopia || color.hex,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    ~1% of males affected
                  </div>
                </div>

                {/* Tritanopia */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Tritanopia (Blue-Blind)</h3>
                  <div className="flex gap-2 mb-3">
                    {colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex-1 h-16 rounded border-2 border-gray-300"
                        style={{
                          backgroundColor:
                            colorBlindResults[color.hex]?.tritanopia || color.hex,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    ~0.001% of population affected
                  </div>
                </div>

                {/* Achromatopsia */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-3">Achromatopsia (Complete)</h3>
                  <div className="flex gap-2 mb-3">
                    {colors.map((color) => (
                      <div
                        key={color.hex}
                        className="flex-1 h-16 rounded border-2 border-gray-300"
                        style={{
                          backgroundColor:
                            colorBlindResults[color.hex]?.achromatopsia || color.hex,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Grayscale vision
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
