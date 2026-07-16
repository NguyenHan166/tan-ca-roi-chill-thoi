// Affiliate tracking engine for logging clicks to affiliate links

export interface ClickTrackingEvent {
  productId: string;
  productName: string;
  timestamp: string;
  source: 'product_grid' | 'hotspot_popover' | 'collections' | 'drawer';
  url: string;
}

export function trackAffiliateClick(
  productId: string,
  productName: string,
  source: ClickTrackingEvent['source'],
  url: string
): void {
  const event: ClickTrackingEvent = {
    productId,
    productName,
    timestamp: new Date().toISOString(),
    source,
    url,
  };

  // 1. Log to developers console with beautiful styling
  console.log(
    `%c[Affiliate Tracking]%c Click registered for "${productName}" (ID: ${productId}) from ${source}. Redirecting to: ${url}`,
    'color: #E8B86D; font-weight: bold; background: #302922; padding: 2px 6px; border-radius: 3px;',
    'color: inherit; font-weight: normal;'
  );

  // 2. Persist in local storage for auditing clicks (Demo mode)
  try {
    const rawEvents = localStorage.getItem('tancaroi_affiliate_clicks');
    const events: ClickTrackingEvent[] = rawEvents ? JSON.parse(rawEvents) : [];
    events.push(event);
    localStorage.setItem('tancaroi_affiliate_clicks', JSON.stringify(events.slice(-50))); // Keep last 50 events
  } catch (e) {
    console.error('Error saving affiliate click track', e);
  }
}

export function getClickHistory(): ClickTrackingEvent[] {
  try {
    const rawEvents = localStorage.getItem('tancaroi_affiliate_clicks');
    return rawEvents ? JSON.parse(rawEvents) : [];
  } catch (e) {
    return [];
  }
}
