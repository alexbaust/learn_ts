import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pages } from '../types/Pags.types';
import { additionalSettingsType } from '../types/SettingProvider.types';

type contextType = {
    crtPage: Pages;
    source: string;
    maxSteps: number;
    additionalSettings: additionalSettingsType;
    updatePage: (newPage: Pages) => void;
    updateSource: (source: string, maxSteps: number) => void;
    updateAdditionalSettings: (newSettings: additionalSettingsType) => void;
};
const SettingContext = createContext<contextType>({
    crtPage: Pages.HOMEPAGE,
    source: 'Shapes',
    maxSteps: 43,
    additionalSettings: {},
    updatePage: () => {},
    updateSource: () => {},
    updateAdditionalSettings: () => {},
});
export const useSettingContext = () => useContext<contextType>(SettingContext);

export const SettingProvider = ({ children }: { children: React.ReactNode }) => {
    const [crtPage, setCrtPage] = useState<Pages>(Pages.HOMEPAGE);
    const [source, setSource] = useState<string>('Shapes');
    const [maxSteps, setMaxSteps] = useState<number>(43);
    const [additionalSettings, setAdditionalSettings] =
        useState<additionalSettingsType>({});

    useEffect(() => {
        const storedCrtPage = localStorage.getItem('crtPage');
        if (storedCrtPage) setCrtPage(JSON.parse(storedCrtPage));

        const storedSource = localStorage.getItem('source');
        if (storedSource) setSource(JSON.parse(storedSource));

        const storedMaxStep = localStorage.getItem('maxStep');
        if (storedMaxStep) setMaxSteps(JSON.parse(storedMaxStep));

        const storedAdditionalSettings = localStorage.getItem('additionalSettings');
        if (storedAdditionalSettings)
            setAdditionalSettings(JSON.parse(storedAdditionalSettings));
    }, []);

    useEffect(() => {
        localStorage.setItem('crtPage', JSON.stringify(crtPage));
    }, [crtPage]);

    useEffect(() => {
        localStorage.setItem('source', JSON.stringify(source));
    }, [source]);

    useEffect(() => {
        localStorage.setItem('maxSteps', JSON.stringify(maxSteps));
    }, [maxSteps]);

    useEffect(() => {
        localStorage.setItem('additionalSettings', JSON.stringify(additionalSettings));
    }, [additionalSettings]);

    const updatePage = (newPage: Pages) => {
        setCrtPage(newPage);
    };
    const updateSource = (source: string, maxSteps: number) => {
        setSource(source);
        setMaxSteps(maxSteps);
    };

    const updateAdditionalSettings = (newSettings: additionalSettingsType) => {
        setAdditionalSettings(newSettings);
    };

    const value = {
        crtPage,
        source,
        maxSteps,
        additionalSettings,
        updatePage,
        updateSource,
        updateAdditionalSettings,
    };

    return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};
