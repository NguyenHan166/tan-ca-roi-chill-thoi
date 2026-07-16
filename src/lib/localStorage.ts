// Local Storage helper for persistent client-side state

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem('tancaroi_favorites');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading favorites from localStorage', e);
    return [];
  }
}

export function saveFavorites(favs: string[]): void {
  try {
    localStorage.setItem('tancaroi_favorites', JSON.stringify(favs));
  } catch (e) {
    console.error('Error saving favorites to localStorage', e);
  }
}

export function toggleFavorite(productId: string): string[] {
  const current = getFavorites();
  const index = current.indexOf(productId);
  let updated: string[];
  if (index > -1) {
    updated = current.filter(id => id !== productId);
  } else {
    updated = [...current, productId];
  }
  saveFavorites(updated);
  return updated;
}

export function isProductFavorited(productId: string): boolean {
  return getFavorites().includes(productId);
}

export function saveSubscription(email: string): void {
  try {
    const subs = getSubscriptions();
    if (!subs.includes(email)) {
      localStorage.setItem('tancaroi_subscriptions', JSON.stringify([...subs, email]));
    }
  } catch (e) {
    console.error('Error saving subscription', e);
  }
}

export function getSubscriptions(): string[] {
  try {
    const data = localStorage.getItem('tancaroi_subscriptions');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}
