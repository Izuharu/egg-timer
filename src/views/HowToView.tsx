import React from 'react';
import './HowToView.css';

const STEPS = [
    "Fill a pot with water and bring to a rolling boil",
    "Gently lower eggs into boiling water using a spoon",
    "Set timer according to desired consistency",
    "Prepare ice bath while eggs are cooking",
    "Transfer eggs immediately to ice bath when timer ends",
    "Let cool for 5 minutes, then peel and enjoy"
];

const CONSISTENCY_GUIDE = [
    { label: "Soft Boiled", time: "6-7 minutes", desc: "Runny yolk, set whites. Perfect for dipping toast." },
    { label: "Medium Boiled", time: "8-9 minutes", desc: "Jammy yolk, firm whites. Great for ramen or salads." },
    { label: "Hard Boiled", time: "10-11 minutes", desc: "Fully set yolk, firm throughout. Ideal for egg salad." },
];

const PRO_TIPS = [
    { icon: "🌡️", title: "Start with Room Temperature Eggs", desc: "Take eggs out of the fridge 10-15 minutes before boiling to prevent cracking." },
    { icon: "💧", title: "Use Enough Water", desc: "Ensure eggs are covered by at least 1 inch of water for even cooking." },
    { icon: "⏱️", title: "Timing is Everything", desc: "Start your timer as soon as eggs hit the boiling water for consistent results." },
    { icon: "❄️", title: "Ice Bath is Crucial", desc: "Immediately transfer eggs to ice water to stop cooking and make peeling easier." },
    { icon: "🥣", title: "Easy Peeling Trick", desc: "For easier peeling, use eggs that are at least 7-10 days old. Fresh eggs are harder to peel." }
];

export const HowToView: React.FC = () => {
    return (
        <div className="view-container howto-view">
            <div className="howto-header">
                <div className="info-icon">i</div>
                <h2>How to Boil Eggs</h2>
                <p>Master the art of perfect boiled eggs</p>
            </div>

            <div className="basic-method-card">
                <h3>Basic Method</h3>
                <ol className="method-steps">
                    {STEPS.map((step, i) => (
                        <li key={i}>
                            <span className="step-num">{i + 1}</span>
                            <span className="step-text">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <h3 className="section-title">Consistency Guide</h3>
            <div className="consistency-list">
                {CONSISTENCY_GUIDE.map((item, i) => (
                    <div key={i} className="guide-card">
                        <div className="guide-header">
                            <span className="guide-dot"></span>
                            <h4>{item.label}</h4>
                            <span className="guide-time">{item.time}</span>
                        </div>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>

            <h3 className="section-title">Pro Tips</h3>
            <div className="protips-list">
                {PRO_TIPS.map((tip, i) => (
                    <div key={i} className="protip-card">
                        <div className="protip-icon">{tip.icon}</div>
                        <div className="protip-content">
                            <h4>{tip.title}</h4>
                            <p>{tip.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
