import { FarmerProfile, SchemeMatchResult, PersonalizedStep } from '../types';

export class PathwayGenerator {
  /**
   * Generates a 5-step customized action pathway tailored to the farmer's
   * specific geography, crop, holding size, and requirement gaps.
   */
  public static generatePathway(
    profile: FarmerProfile,
    results: SchemeMatchResult[]
  ): PersonalizedStep[] {
    const isTN = profile.state.toLowerCase().includes('tamil nadu');
    const district = profile.district || 'Thanjavur';
    const crop = profile.crop || 'Paddy';
    const landSize = profile.landSize || 2;
    const landUnit = profile.landUnit || 'acres';

    const relevantSchemes = results.filter(
      r => r.status === 'POTENTIALLY RELEVANT' || r.status === 'NEEDS VERIFICATION'
    );
    const topSchemeCodes = relevantSchemes.slice(0, 3).map(r => r.scheme.code).join(', ');

    const steps: PersonalizedStep[] = [
      {
        stepNumber: 1,
        title: `Verify ${profile.name || 'Farmer'} Profile & Land Survey Details`,
        description: `Confirm your recorded holding (${landSize} ${landUnit} of ${crop} in ${district}, ${profile.state}) matches the digital land records database.`,
        status: 'completed',
        priority: 'Immediate',
        schemeTag: 'Foundational Baseline',
        actionText: 'Review Profile Data',
        channel: isTN ? 'TN AnyRural / Tamil Nilam Portal' : 'State Digital Land Records',
        officialUrl: isTN ? 'https://eservices.tn.gov.in' : undefined,
        detailList: [
          `Land Parcel: ${landSize} ${landUnit} registered in ${district} revenue circle`,
          `Cultivated Crop: ${crop} recorded under current seasonal cycle`,
          `Category: ${profile.farmerCategory}`
        ]
      },
      {
        stepNumber: 2,
        title: `Clear Core Verification Gaps (${topSchemeCodes})`,
        description: `Complete pending Aadhaar biometric e-KYC and obtain current season's Adangal/crop cultivation certificate from the Village Administrative Officer.`,
        status: 'in_progress',
        priority: 'Immediate',
        schemeTag: 'PM-KISAN · PMFBY Requirement Check',
        actionText: isTN ? 'Book CSC / e-Seva Slot in Thanjavur' : 'Visit Nearest CSC Centre',
        channel: isTN ? 'e-Seva Centre / Village Administrative Officer (VAO)' : 'Common Service Centre (CSC)',
        officialUrl: 'https://pmkisan.gov.in',
        detailList: [
          'Biometric or mobile OTP e-KYC on pmkisan.gov.in',
          `Sowing certificate (Adangal) signed by ${district} VAO for ${crop}`,
          'Confirm bank account is mapped to NPCI Aadhaar Payment Bridge'
        ]
      },
      {
        stepNumber: 3,
        title: `Check Current Seasonal Cutoffs & Quota Availability`,
        description: `Confirm the enrollment deadline for ${crop} insurance (PMFBY) and check if Tamil Nadu state seed kits or farm machinery tokens are currently active.`,
        status: 'pending',
        priority: 'Next',
        schemeTag: 'Seasonal Window Check',
        actionText: isTN ? 'Check TN Uzhavan App Notifications' : 'Check District Agri Calendar',
        channel: isTN ? 'TN Uzhavan App / Thanjavur Agri Dept' : 'District Agriculture Office',
        officialUrl: isTN ? 'https://www.tn.gov.in/department/1' : 'https://pmfby.gov.in',
        detailList: [
          `Seasonal cut-off date check for ${crop} in ${district}`,
          'Check district quota for smallholder farm machinery subsidy (SMAM)',
          'Check if village panchayat is included in Kalaignarin All Village Scheme'
        ]
      },
      {
        stepNumber: 4,
        title: `Apply Through Official Departmental Portals & PACCS`,
        description: `Submit applications directly through verified government channels. Avoid middlemen and commercial service fees.`,
        status: 'pending',
        priority: 'Next',
        schemeTag: 'Official Filing',
        actionText: 'Access Official Portals',
        channel: 'Primary Agricultural Cooperative Society (PACCS) / pmkisan.gov.in',
        officialUrl: 'https://pmkisan.gov.in',
        detailList: [
          'Submit 1-page simplified KCC loan form at your rural bank branch',
          `Enroll in PMFBY with 1.5% premium payment receipt for ${crop}`,
          'Register for free certified seed kit at your Block Agricultural Extension Centre'
        ]
      },
      {
        stepNumber: 5,
        title: `Track Direct Benefit Transfers (DBT) & Sanction Slips`,
        description: `Monitor DBT credits via PFMS portal and save policy certificates with acknowledgement numbers for future claims or seasonal renewals.`,
        status: 'pending',
        priority: 'Follow-up',
        schemeTag: 'Disbursement Tracking',
        actionText: 'Track Status on PFMS / PM-KISAN',
        channel: 'Public Financial Management System (PFMS) & SMS Alerts',
        officialUrl: 'https://pfms.nic.in',
        detailList: [
          'SMS confirmation alert upon ₹2,000 PM-KISAN installment transfer',
          'Safeguard PMFBY policy certificate number for post-harvest loss claims',
          'Seasonal KCC credit renewal before next agricultural cycle'
        ]
      }
    ];

    return steps;
  }
}
