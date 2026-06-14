import { publicUrl } from '@/lib/assets';

const PLACEHOLDER = publicUrl('/placeholder.svg');

export function getProjectImage(slug: string, index = 1): string {
  return publicUrl(`/images/projects/${slug}-${index}.jpg`);
}

export function getAchievementImage(id: string, index = 1): string {
  return publicUrl(`/images/achievements/${id}-${index}.jpg`);
}

export function getPlaceholder(): string {
  return PLACEHOLDER;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  if (!target.src.endsWith('placeholder.svg')) {
    target.src = PLACEHOLDER;
  }
}
