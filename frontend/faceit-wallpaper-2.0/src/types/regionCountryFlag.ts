export function getRegionName(code: string) {
    const regions: Record<string, string> = {
        EU: "Europe",
        NA: "North America",
        SEA: "South America",
        AS: "Asia",
        OCE: "Oceania",
    };

    return regions[code] ? regions[code] : '';
}

export function getCountryFlag(code: string) {
    const exceptions: Record<string, string> = {
        ac: "sh",
        ta: "sh",
    };

    return exceptions[code] ?? code.toLowerCase();
}