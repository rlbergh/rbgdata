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
  recommendation: 'black' | 'white';
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

  // Determine if black or white is better for a color
  const getBestTextColor = (rgb: { r: number; g: number; b: number }): 'black' | 'white' => {
    const blackRgb = { r: 0, g: 0, b: 0 };
    const whiteRgb = { r: 255, g: 255, b: 255 };
    
    const blackContrast = getContrastRatio(rgb, blackRgb);
    const whiteContrast = getContrastRatio(rgb, whiteRgb);
    
    return blackContrast > whiteContrast ? 'black' : 'white';
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
          recommendation: getBestTextColor(palette[i].rgb),
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
        <div className="container-max max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Section - Left */}
            <div className="lg:col-span-1 palette-input-section">
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

            {/* Color Blindness Simulations - Right */}
            {colors.length > 0 && Object.keys(colorBlindResults).length > 0 && (
              <div className="lg:col-span-2 palette-colorblind-section">
                <h2 className="text-xl font-bold text-teal mb-4">Color Blindness Simulations</h2>
                <p className="text-sm text-gray-700 mb-6">
                  How your palette appears to people with different types of color vision deficiency.
                </p>

                <div className="space-y-6">
                  {/* Original */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Normal Vision</h3>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.hex}
                          className="flex-1 h-12 rounded border-2 border-gray-300"
                          style={{ backgroundColor: color.hex }}
                          title={color.hex}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Protanopia */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Protanopia (Red-Blind)</h3>
                    <div className="text-xs text-gray-600 mb-2">~1% of males affected</div>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.hex}
                          className="flex-1 h-12 rounded border-2 border-gray-300"
                          style={{
                            backgroundColor:
                              colorBlindResults[color.hex]?.protanopia || color.hex,
                          }}
                          title={colorBlindResults[color.hex]?.protanopia}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Deuteranopia */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Deuteranopia (Green-Blind)</h3>
                    <div className="text-xs text-gray-600 mb-2">~1% of males affected</div>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.hex}
                          className="flex-1 h-12 rounded border-2 border-gray-300"
                          style={{
                            backgroundColor:
                              colorBlindResults[color.hex]?.deuteranopia || color.hex,
                          }}
                          title={colorBlindResults[color.hex]?.deuteranopia}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tritanopia */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Tritanopia (Blue-Blind)</h3>
                    <div className="text-xs text-gray-600 mb-2">~0.001% of population affected</div>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.hex}
                          className="flex-1 h-12 rounded border-2 border-gray-300"
                          style={{
                            backgroundColor:
                              colorBlindResults[color.hex]?.tritanopia || color.hex,
                          }}
                          title={colorBlindResults[color.hex]?.tritanopia}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Achromatopsia */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Achromatopsia (Complete)</h3>
                    <div className="text-xs text-gray-600 mb-2">Grayscale vision (~0.0001%)</div>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.hex}
                          className="flex-1 h-12 rounded border-2 border-gray-300"
                          style={{
                            backgroundColor:
                              colorBlindResults[color.hex]?.achromatopsia || color.hex,
                          }}
                          title={colorBlindResults[color.hex]?.achromatopsia}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contrast Ratios - Bottom */}
          {colors.length > 0 && contrastResults.length > 0 && (
            <div className="palette-contrast-section">
              <h2 className="text-xl font-bold text-teal mb-4">Contrast Ratios</h2>
              <p className="text-sm text-gray-700 mb-6">
                Contrast ratios determine whether text in one color is readable on a background of another color. Below are recommendations for text color (black or white) to use on each color in your palette.
              </p>

              <div className="space-y-4">
                {contrastResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded border-l-4 border-gray-300 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-8 h-8 rounded border-2 border-gray-300"
                          style={{ backgroundColor: result.color1 }}
                        />
                        <span className="text-xs font-mono text-gray-600">vs</span>
                        <div
                          className="w-8 h-8 rounded border-2 border-gray-300"
                          style={{ backgroundColor: result.color2 }}
                        />
                        <span className="text-sm font-semibold text-charcoal">
                          {result.ratio}:1
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {result.wcagAAA && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                            WCAG AAA
                          </span>
                        )}
                        {result.wcagAA && !result.wcagAAA && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                            WCAG AA
                          </span>
                        )}
                        {!result.wcagAA && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded font-semibold">
                            Needs Work
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!result.wcagAA && (
                      <div className="text-xs text-gray-700 bg-orange-50 p-3 rounded">
                        <strong>Caveat:</strong> These colors don't have sufficient contrast for readable text. Consider using <span className="font-semibold capitalize">{result.recommendation}</span> text on <span className="font-mono">{result.color1}</span> instead, which will have better readability.
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400 mt-6">
                <p className="text-xs font-semibold text-blue-900 mb-2">Understanding Contrast</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• <strong>WCAG AAA (7:1)</strong> = Best for all text sizes and audiences</li>
                  <li>• <strong>WCAG AA (4.5:1)</strong> = Minimum accessible standard for body text</li>
                  <li>• <strong>Needs Work (&lt;4.5:1)</strong> = Consider using black or white text instead</li>
                  <li>• <strong>Note:</strong> These ratios assume text on background colors</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
