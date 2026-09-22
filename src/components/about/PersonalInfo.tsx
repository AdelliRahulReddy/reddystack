'use client';

import Image from "next/image";
import whatsap from "@/assets/img/about/whatsap.png";
import shape_1 from "@/assets/img/services/shape/services-shape-1.png";
import shape_2 from "@/assets/img/services/shape/services-shape-2.png";
import { siteConfig } from "@/data/siteConfig";

const capabilities = [
  "Growth Diagnostics",
  "Web & Landing Pages",
  "Search Visibility",
  "Paid Acquisition",
  "Creative Testing",
  "Tracking & Analytics",
  "AI Workflows",
  "Product Builds",
];

const principles = [
  ["Problem before channel", "The work starts with the commercial problem and current evidence, not a preselected service package."],
  ["Proof before scale", "A focused build or test creates evidence before more budget, more channels, or a longer engagement is recommended."],
  ["Transparent AI use", "AI can support research and execution. Rahul remains responsible for review, decisions, quality, and communication."],
  ["Client-owned foundations", "Domains, hosting, advertising accounts, analytics, and core business assets remain under the client's ownership."],
] as const;

const experience = [
  ["2022 - 2025", "Analyst", "HCLTech · Olin project"],
  ["2025 - Present", "Senior Analyst", "HCLTech · Verizon project"],
  ["Apr 2026 - Present", "Founder", "ReddyStack"],
] as const;

const PersonalInfo = () => (
  <div className="ab-personal-info__area black-bg-3 pb-30 tp-personal-info-pin-section">
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="tp-personal-info-pin">
            <div className="ab-personal-info__left-box mr-200">
              <div className="tp-services-wrapper tp-services-capsule-wrapper p-relative" data-tp-throwable-scene="true">
                <div className="ab-personal-info__left-content">
                  <h2 className="ab-personal-info__left-content-title">Founder-led, proof-first</h2>
                  <p>
                    ReddyStack is an independent digital growth studio operated by Rahul Reddy Adelli from Hyderabad. Every engagement has one accountable lead, a defined problem, a connected scope, and an evidence plan.
                  </p>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer">
                    <span><Image src={whatsap} alt="WhatsApp contact icon" /></span>{siteConfig.phoneDisplay}
                  </a>
                </div>

                <div className="tp-services-capsule-item-wrapper">
                  {capabilities.map((capability, index) => (
                    <p key={capability} data-tp-throwable-el="">
                      <span
                        className="tp-services-capsule-item"
                        style={{
                          backgroundColor: index % 3 === 1 ? "var(--tp-pink-2)" : index % 3 === 2 ? "var(--tp-blue-2)" : "var(--tp-green-2)",
                          color: index % 3 === 2 ? "var(--tp-common-white)" : "var(--tp-common-black)",
                        }}
                      >
                        {capability}
                      </span>
                    </p>
                  ))}
                  <p data-tp-throwable-el=""><span><Image src={shape_1} alt="" /></span></p>
                  <p data-tp-throwable-el=""><span><Image src={shape_2} alt="" /></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="ab-personal-info__right-wrap">
            <div className="ab-personal-info__exprience mb-85">
              <h2 className="ab-personal-info__right-title">How I work</h2>
              <p>I start with the offer, customer, commercial goal, current setup, and what has already been tried. The first recommendation may be a page, search fix, campaign test, tracking repair, creative comparison, or workflow—not every capability at once.</p>
              <p>Before work starts, the proposal names deliverables, access, approvals, costs, review points, exclusions, and the evidence that can reasonably be collected. Results are interpreted with their limits; no lead volume, revenue, or ranking is guaranteed.</p>
              <p>Current portfolio items remain clearly marked as personal or demo work. Client outcomes will be published only when the work is real, permission exists, and the measurement supports the claim.</p>
            </div>

            <div className="ab-personal-info__exprience mb-85">
              <h2 className="ab-personal-info__right-title">Operating principles</h2>
              {principles.map(([title, description], index) => (
                <div key={title} className="ab-personal-info__exprience-box d-flex align-items-start">
                  <span className="ab-personal-info__exprience-length">0{index + 1}</span>
                  <div className="ab-personal-info__exprience-content">
                    <h3 className="ab-personal-info__exprience-title">{title}</h3>
                    <span>{description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-personal-info__exprience mb-85">
              <h2 className="ab-personal-info__right-title">Background</h2>
              {experience.map(([time, designation, company]) => (
                <div key={`${time}-${designation}`} className="ab-personal-info__exprience-box d-flex align-items-start">
                  <span className="ab-personal-info__exprience-length">{time}</span>
                  <div className="ab-personal-info__exprience-content">
                    <h3 className="ab-personal-info__exprience-title">{designation}</h3>
                    <span>{company}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-personal-info__exprience mb-85">
              <h2 className="ab-personal-info__right-title">Education</h2>
              <div className="ab-personal-info__exprience-box d-flex align-items-start">
                <span className="ab-personal-info__exprience-length">2022 - Present</span>
                <div className="ab-personal-info__exprience-content">
                  <h3 className="ab-personal-info__exprience-title">B.Sc. Design & Computing (WILP)</h3>
                  <span>BITS Pilani</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalInfo;
