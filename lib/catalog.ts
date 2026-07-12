// Product catalog: four divisions, two units each. Copy written fresh per unit.
// `mediaSlot` ties each unit to an image slot managed from the console.

export type Unit = {
  slug: string;
  name: string;
  blurb: string;
  features: string[];
  mediaSlot: string;
};

export type Division = {
  slug: string;
  name: string;
  index: string; // grid label, e.g. "01"
  summary: string;
  units: Unit[];
};

export const divisions: Division[] = [
  {
    slug: "wheelchairs",
    name: "Wheelchairs",
    index: "01",
    summary:
      "Transit and powered seating built around real transfer weights, doorway widths, and the people who push them.",
    units: [
      {
        slug: "featherframe-transit",
        name: "Featherframe Transit Chair",
        blurb:
          "A 19-pound aluminum transit chair that folds to the trunk of a compact car without a fight.",
        features: [
          "19 lb frame, 300 lb capacity",
          "Flip-back arms for level transfers",
          "8-inch rear wheels for curbs",
          "Twin attendant locking brakes",
        ],
        mediaSlot: "unit-featherframe-transit",
      },
      {
        slug: "terra-recline-power",
        name: "Terra Recline Power Chair",
        blurb:
          "A mid-wheel-drive power chair with a true recline range for all-day pressure relief.",
        features: [
          "Mid-wheel drive, tight turning radius",
          "Powered 95° – 175° recline",
          "18-mile range per charge",
          "Programmable joystick controller",
        ],
        mediaSlot: "unit-terra-recline",
      },
    ],
  },
  {
    slug: "mobility-aids",
    name: "Mobility Aids",
    index: "02",
    summary:
      "Walkers and rollators tuned for stability first, weight second — nothing that rattles on a tiled floor.",
    units: [
      {
        slug: "stride-rollator",
        name: "Stride Rollator",
        blurb:
          "A four-wheel rollator with a padded seat and a brake feel that stays firm after a year of use.",
        features: [
          "8-inch wheels, indoor & outdoor",
          "Locking loop brakes, cable-guided",
          "Padded seat with under-storage",
          "Height-set handles, 32–38 in",
        ],
        mediaSlot: "unit-stride-rollator",
      },
      {
        slug: "cadence-folding-walker",
        name: "Cadence Folding Walker",
        blurb:
          "A dual-button folding walker with front glides — the quiet, dependable baseline aid.",
        features: [
          "Dual-paddle one-hand fold",
          "5-inch front glide wheels",
          "350 lb rated capacity",
          "Contoured soft-grip handles",
        ],
        mediaSlot: "unit-cadence-walker",
      },
    ],
  },
  {
    slug: "diabetic-care",
    name: "Diabetic Care",
    index: "03",
    summary:
      "Monitoring and footwear for daily management — accurate readings, and shoes that protect at-risk feet.",
    units: [
      {
        slug: "glucotrack-kit",
        name: "GlucoTrack Monitor Kit",
        blurb:
          "A complete glucose-monitoring kit with a fast meter, lancing device, and starter strips.",
        features: [
          "5-second read time",
          "500-result memory with averages",
          "No-code test strips",
          "Includes carry case & lancets",
        ],
        mediaSlot: "unit-glucotrack-kit",
      },
      {
        slug: "softstep-footwear",
        name: "SoftStep Diabetic Footwear",
        blurb:
          "Extra-depth therapeutic shoes with seamless interiors to reduce pressure and shear.",
        features: [
          "Seamless interior lining",
          "Removable multi-density insoles",
          "Extra-depth toe box",
          "Slip-resistant outsole",
        ],
        mediaSlot: "unit-softstep-footwear",
      },
    ],
  },
  {
    slug: "orthopedic-braces",
    name: "Orthopedic Braces",
    index: "04",
    summary:
      "Bracing that holds a joint where the clinician set it — hinged support without the bulk.",
    units: [
      {
        slug: "axisguard-knee",
        name: "AxisGuard Knee Brace",
        blurb:
          "A hinged knee brace with adjustable range-of-motion stops for post-op recovery.",
        features: [
          "Polycentric dual hinges",
          "Range-set flexion/extension stops",
          "Breathable perforated liner",
          "Fits 13–28 in circumference",
        ],
        mediaSlot: "unit-axisguard-knee",
      },
      {
        slug: "meridian-lumbar",
        name: "Meridian Lumbar Support",
        blurb:
          "A low-profile lumbar brace with a pulley system for targeted compression through the day.",
        features: [
          "2:1 pulley tension system",
          "Removable rigid back panel",
          "Low-profile under clothing",
          "Moisture-wicking body",
        ],
        mediaSlot: "unit-meridian-lumbar",
      },
    ],
  },
];

export function allUnits(): Unit[] {
  return divisions.flatMap((d) => d.units);
}

export function findDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}
