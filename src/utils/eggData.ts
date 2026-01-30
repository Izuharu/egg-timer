export type EggType = 'chicken' | 'quail' | 'duck';
export type EggSize = 'small' | 'medium' | 'large';
export type EggConsistency = 'quarter' | 'half' | 'hard';

export const EGG_TYPES: { id: EggType; label: string }[] = [
    { id: 'chicken', label: 'Chicken' },
    { id: 'quail', label: 'Quail' },
    { id: 'duck', label: 'Duck' },
];

export const EGG_SIZES: { id: EggSize; label: string }[] = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
];

export const EGG_CONSISTENCIES: { id: EggConsistency; label: string; description: string }[] = [
    { id: 'quarter', label: 'Quarter', description: 'Runny yolk, set white' },
    { id: 'half', label: 'Half', description: 'Jammy yolk, firm white' },
    { id: 'hard', label: 'Hard', description: 'Fully set yolk & white' },
];

// Time in seconds
// Base times for Medium Chicken Egg
const BASE_TIMES: Record<EggConsistency, number> = {
    quarter: 4 * 60, // 4 mins
    half: 6 * 60 + 30, // 6.5 mins
    hard: 10 * 60, // 10 mins
};

export const getCookingTime = (type: EggType, size: EggSize, consistency: EggConsistency): number => {
    let time = BASE_TIMES[consistency];

    // Adjust for Egg Type
    if (type === 'quail') {
        time = time / 2.5; // Quail eggs are much faster
    } else if (type === 'duck') {
        time = time * 1.4; // Duck eggs take longer
    }

    // Adjust for Size (Chicken only mainly, but applied generally for simplicity logic)
    if (size === 'small') time -= 30;
    if (size === 'large') time += 30;

    return Math.floor(time);
};
