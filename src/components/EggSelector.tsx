import React from 'react';
import { EGG_TYPES, EGG_SIZES, EGG_CONSISTENCIES } from '../utils/eggData';
import type { EggType, EggSize, EggConsistency } from '../utils/eggData';
import './EggSelector.css';

interface EggSelectorProps {
    selectedType: EggType;
    selectedSize: EggSize;
    selectedConsistency: EggConsistency;
    onTypeChange: (type: EggType) => void;
    onSizeChange: (size: EggSize) => void;
    onConsistencyChange: (consistency: EggConsistency) => void;
    disabled?: boolean;
}

export const EggSelector: React.FC<EggSelectorProps> = ({
    selectedType,
    selectedSize,
    selectedConsistency,
    onTypeChange,
    onSizeChange,
    onConsistencyChange,
    disabled
}) => {
    return (
        <div className={`egg-selector ${disabled ? 'disabled' : ''}`}>
            <section className="selector-group">
                <h3>Type</h3>
                <div className="button-group">
                    {EGG_TYPES.map((type) => (
                        <button
                            key={type.id}
                            className={selectedType === type.id ? 'selected' : ''}
                            onClick={() => onTypeChange(type.id)}
                            disabled={disabled}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </section>

            <section className="selector-group">
                <h3>Size</h3>
                <div className="button-group">
                    {EGG_SIZES.map((size) => (
                        <button
                            key={size.id}
                            className={selectedSize === size.id ? 'selected' : ''}
                            onClick={() => onSizeChange(size.id)}
                            disabled={disabled}
                        >
                            {size.label}
                        </button>
                    ))}
                </div>
            </section>

            <section className="selector-group">
                <h3>Consistency</h3>
                <div className="consistency-group">
                    {EGG_CONSISTENCIES.map((consistency) => (
                        <button
                            key={consistency.id}
                            className={`consistency-btn ${selectedConsistency === consistency.id ? 'selected' : ''}`}
                            onClick={() => onConsistencyChange(consistency.id)}
                            disabled={disabled}
                        >
                            <span className="consistency-label">{consistency.label}</span>
                            <span className="consistency-desc">{consistency.description}</span>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};
