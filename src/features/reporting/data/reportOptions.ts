import { ReportOption } from '../types';

export const goodOptions: ReportOption[] = [
    { value: "exceeds-standard", text: "🌟 Exceeds Standard" },
    { value: "fully-compliant", text: "✅ Fully Compliant" },
    { value: "well-maintained", text: "🔧 Well Maintained" },
    { value: "properly-cleared", text: "🌿 Properly Cleared" },
    { value: "safety-followed", text: "🛡️ Safety Protocols Followed" }
];

export const badOptions: ReportOption[] = [
    { value: "needs-attention", text: "⚠️ Needs Attention" },
    { value: "non-compliant", text: "❌ Non-Compliant" },
    { value: "safety-risk", text: "🚨 Safety Risk" },
    { value: "immediate-action", text: "🔥 Immediate Action Required" },
    { value: "maintenance-overdue", text: "🔧 Maintenance Overdue" },
    { value: "storm-response", text: "⛈️ Storm Response Conditions" },
    { value: "access-blocked", text: "🚫 Access Blocked/Denied" }
];

export const goodDetails: Record<string, ReportOption[]> = {
    "exceeds-standard": [
        { value: "clearance-exceeds-min", text: "🌿 Clearances Exceed Minimum Requirements" },
        { value: "equipment-excellent", text: "🔧 Equipment in Excellent Condition" },
        { value: "proactive-maintenance", text: "⚡ Proactive Maintenance Completed" },
        { value: "safety-excellence", text: "🛡️ Safety Protocols Exceed Standards" },
    ],
    "fully-compliant": [
        { value: "vegetation-properly-cleared", text: "🌿 Vegetation Properly Cleared" },
        { value: "equipment-meets-spec", text: "⚡ Equipment Meets All Specifications" },
        { value: "maintenance-up-to-date", text: "🔧 Maintenance Up to Date" },
        { value: "documentation-complete", text: "📋 Documentation Complete" },
    ],
    "well-maintained": [
        { value: "recent-trimming", text: "✂️ Recent Tree Trimming Completed" },
        { value: "hardware-secure", text: "🔩 Hardware Properly Secured" },
        { value: "insulators-clean", text: "⚡ Insulators Clean and Intact" },
        { value: "access-roads-clear", text: "🛤️ Access Roads Clear and Maintained" },
    ],
    "properly-cleared": [
        { value: "right-of-way-clear", text: "🌿 Right-of-Way Completely Clear" },
        { value: "ground-clearance-good", text: "📏 Ground Clearance Adequate" },
        { value: "structure-clearance-good", text: "🏠 Structure Clearance Adequate" },
        { value: "fire-breaks-maintained", text: "🔥 Fire Breaks Well Maintained" },
    ],
    "safety-followed": [
        { value: "crew-ppe-compliant", text: "🦺 Crew PPE Fully Compliant" },
        { value: "work-procedures-followed", text: "📋 Work Procedures Properly Followed" },
        { value: "safety-signage-posted", text: "⚠️ Safety Signage Properly Posted" },
        { value: "environmental-compliance", text: "🌱 Environmental Compliance Verified" },
    ],
};

export const badDetails: Record<string, ReportOption[]> = {
    "needs-attention": [
        { value: "vegetation-approaching", text: "🌿 Vegetation Approaching Clearance Limits" },
        { value: "minor-equipment-wear", text: "🔧 Minor Equipment Wear Detected" },
        { value: "documentation-missing", text: "📋 Documentation Missing or Incomplete" },
        { value: "follow-up-required", text: "📅 Follow-up Inspection Required" },
    ],
    "non-compliant": [
        { value: "clearance-violations", text: "📏 Clearance Violations Identified" },
        { value: "maintenance-overdue-detail", text: "🔧 Scheduled Maintenance Overdue" },
        { value: "ppe-not-worn", text: "🦺 PPE Not Worn (Hard Hat, Safety Vest, Gloves)" },
        { value: "lockout-tagout-skipped", text: "🔒 Lockout/Tagout Procedures Skipped" },
    ],
    "safety-risk": [
        { value: "vegetation-contact-risk", text: "🌿 Vegetation Contact Risk" },
        { value: "equipment-deterioration", text: "⚡ Equipment Deterioration" },
        { value: "structural-instability", text: "🏗️ Structural Instability" },
        { value: "environmental-hazard", text: "🌊 Environmental Hazard (flooding, erosion)" },
    ],
    "immediate-action": [
        { value: "vegetation-in-contact", text: "🔥 Vegetation in Contact with Lines" },
        { value: "equipment-sparking", text: "⚡ Equipment Sparking or Arcing" },
        { value: "structural-failure", text: "💥 Structural Failure Imminent" },
        { value: "public-safety-threat", text: "🚨 Public Safety Threat" },
    ],
    "maintenance-overdue": [
        { value: "inspection-past-due", text: "📅 Inspection Past Due" },
        { value: "vegetation-management-late", text: "🌿 Vegetation Management Late" },
        { value: "equipment-replacement-needed", text: "🔧 Equipment Replacement Needed" },
        { value: "repairs-not-completed", text: "🛠️ Repairs Not Completed" },
    ],
    "storm-response": [
        { value: "safety-circles-skipped", text: "⚠️ Safety Circles/Briefings Skipped - Emergency" },
        { value: "ppe-requirements-relaxed", text: "🦺 PPE Requirements Relaxed - Emergency" },
        { value: "lockout-tagout-expedited", text: "🔒 Lockout/Tagout Procedures Expedited" },
        { value: "inspection-deferred-storm", text: "📋 Inspection Deferred Due to Storm" },
    ],
    "access-blocked": [
        { value: "owner-denied-access", text: "🏠 Property Owner Denied Access" },
        { value: "legal-restrictions", text: "⚖️ Legal/Permit Restrictions" },
        { value: "terrain-too-steep", text: "⛰️ Terrain Too Steep for Equipment" },
        { value: "ground-conditions-unsafe", text: "🌊 Ground Conditions Unsafe (soft, unstable)" },
    ],
};