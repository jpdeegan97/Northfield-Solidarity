import React from "react";
import "../styles/stained-glass.css";

export const StainedGlass = () => {
    return (
        <div className="stained-glass-container">
            {/* Base layer removed to allow 'lead' lines (gaps) to show through */}

            {/* Corners */}
            <div className="sg-layer sg-corners tl"></div>
            <div className="sg-layer sg-corners tr"></div>
            <div className="sg-layer sg-corners bl"></div>
            <div className="sg-layer sg-corners br"></div>

            {/* Padding */}
            <div className="sg-layer sg-padding top"></div>
            <div className="sg-layer sg-padding bottom"></div>
            <div className="sg-layer sg-padding left"></div>
            <div className="sg-layer sg-padding right"></div>

            {/* Bars */}
            <div className="sg-layer sg-bar top"></div>
            <div className="sg-layer sg-bar bottom"></div>
            <div className="sg-layer sg-bar left"></div>
            <div className="sg-layer sg-bar right"></div>

            {/* Inner Bottom */}
            <div className="sg-layer sg-inner bottom sg-bottom-1"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-2"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-3"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-4"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-5"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-6"></div>
            <div className="sg-layer sg-inner bottom sg-bottom-7"></div>

            {/* Inner Mid */}
            <div className="sg-layer sg-inner mid sg-mid-1"></div>
            <div className="sg-layer sg-inner mid accent sg-mid-2"></div>
            <div className="sg-layer sg-inner mid sg-mid-3"></div>
            <div className="sg-layer sg-inner mid sg-mid-4"></div>
            <div className="sg-layer sg-inner mid accent sg-mid-5"></div>
            <div className="sg-layer sg-inner mid sg-mid-6"></div>
            <div className="sg-layer sg-inner mid sg-mid-7"></div>
            <div className="sg-layer sg-inner mid sg-mid-8"></div>
            <div className="sg-layer sg-inner mid accent sg-mid-9"></div>

            {/* Inner Top */}
            <div className="sg-layer sg-inner top accent sg-top-1"></div>
            <div className="sg-layer sg-inner top sg-top-2"></div>
            <div className="sg-layer sg-inner top sg-top-3"></div>
            <div className="sg-layer sg-inner top sg-top-4"></div>
            <div className="sg-layer sg-inner top sg-top-5"></div>
        </div>
    );
};
