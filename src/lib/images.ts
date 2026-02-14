const PLACEHOLDER = '/placeholder.svg';

export function getProjectImage(slug: string, index = 1): string {
  return `/images/projects/${slug}-${index}.jpg`;
}

export function getAchievementImage(id: string, index = 1): string {
  return `/images/achievements/${id}-${index}.jpg`;
}

export function getPlaceholder(): string {
  return PLACEHOLDER;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  if (!target.src.endsWith(PLACEHOLDER)) {
    target.src = PLACEHOLDER;
  }
}
