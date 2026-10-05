/**
 * Convert YouTube URL or video ID to responsive embed iframe
 * 
 * Accepts:
 * - Full YouTube URL: https://www.youtube.com/watch?v=BSP-rM2i9kg
 * - Short URL: https://youtu.be/BSP-rM2i9kg
 * - Video ID: BSP-rM2i9kg
 * 
 * Returns responsive iframe with 100% width and 16:9 aspect ratio
 */

export function youtubeUrlToEmbed(input: string): string {
  try {
    let videoId = '';

    // Extract video ID from different URL formats
    if (input.includes('youtube.com/watch')) {
      // Format: https://www.youtube.com/watch?v=BSP-rM2i9kg
      const match = input.match(/v=([^&]+)/);
      videoId = match ? match[1] : '';
    } else if (input.includes('youtu.be')) {
      // Format: https://youtu.be/BSP-rM2i9kg
      const match = input.match(/youtu\.be\/([^?]+)/);
      videoId = match ? match[1] : '';
    } else if (input.match(/^[a-zA-Z0-9_-]{11}$/)) {
      // Direct video ID (11 characters)
      videoId = input;
    }

    if (!videoId) {
      console.error('Invalid YouTube URL or video ID');
      return '';
    }

    // Create responsive embed iframe
    // 100% width with 432px height maintains 16:9 aspect ratio for typical content widths
    const embedCode = `<iframe 
width="100%" 
height="432" 
src="https://www.youtube.com/embed/${videoId}" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" 
allowfullscreen
style="border-radius: 4px; margin: 2rem 0; display: block; max-width: 100%;">
</iframe>`;

    return embedCode;
  } catch (error) {
    console.error('Error converting YouTube URL to embed:', error);
    return '';
  }
}

/**
 * Extract video ID from YouTube URL
 */
export function extractYoutubeVideoId(input: string): string {
  try {
    if (input.includes('youtube.com/watch')) {
      const match = input.match(/v=([^&]+)/);
      return match ? match[1] : '';
    } else if (input.includes('youtu.be')) {
      const match = input.match(/youtu\.be\/([^?]+)/);
      return match ? match[1] : '';
    } else if (input.match(/^[a-zA-Z0-9_-]{11}$/)) {
      return input;
    }
    return '';
  } catch (error) {
    console.error('Error extracting YouTube video ID:', error);
    return '';
  }
}
