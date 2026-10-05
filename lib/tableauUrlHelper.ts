/**
 * Convert Tableau Public URL to markdown image link
 * 
 * Pattern: https://public.tableau.com/views/{workbook}/{sheet}
 * becomes: https://public.tableau.com/static/images/{first2chars}/{workbook}/{sheet}/1.png
 * 
 * Strips query parameters (everything after ?)
 */

export function tableauUrlToMarkdownImage(tableauUrl: string): string {
  try {
    // Strip query parameters (everything after ?)
    const cleanUrl = tableauUrl.split('?')[0];

    // Parse the URL: https://public.tableau.com/views/Takea2650-milejourneyonthePCT/PCTStart
    const urlMatch = cleanUrl.match(
      /https:\/\/public\.tableau\.com\/views\/([^\/]+)\/([^\/\s]+)/
    );

    if (!urlMatch) {
      console.error('Invalid Tableau URL format');
      return '';
    }

    const workbook = urlMatch[1]; // e.g., "Takea2650-milejourneyonthePCT"
    const sheet = urlMatch[2]; // e.g., "PCTStart"

    // Extract first 2 characters from workbook for the directory structure
    const twoChars = workbook.substring(0, 2);

    // Construct the static image URL
    const imageUrl = `https://public.tableau.com/static/images/${twoChars}/${workbook}/${sheet}/1.png`;

    // Create markdown image link using the clean URL (without query params)
    // Use sheet name as alt text, or a generic fallback
    const altText = sheet.replace(/([A-Z])/g, ' $1').trim(); // Convert camelCase to words
    const markdownLink = `[![${altText}](${imageUrl})](${cleanUrl})`;

    return markdownLink;
  } catch (error) {
    console.error('Error converting Tableau URL:', error);
    return '';
  }
}

/**
 * Convert Tableau Public URL to just the image URL
 * Strips query parameters (everything after ?)
 */
export function tableauUrlToImageUrl(tableauUrl: string): string {
  try {
    // Strip query parameters
    const cleanUrl = tableauUrl.split('?')[0];

    const urlMatch = cleanUrl.match(
      /https:\/\/public\.tableau\.com\/views\/([^\/]+)\/([^\/\s]+)/
    );

    if (!urlMatch) return '';

    const workbook = urlMatch[1];
    const sheet = urlMatch[2];
    const twoChars = workbook.substring(0, 2);

    return `https://public.tableau.com/static/images/${twoChars}/${workbook}/${sheet}/1.png`;
  } catch (error) {
    console.error('Error converting Tableau URL to image URL:', error);
    return '';
  }
}
