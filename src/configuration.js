const BASIC_OPTIONS = {
    maxWidth: {
        label: {
            en: 'Max width',
            fr: 'Largeur maximale',
        },
        type: 'Number',
        options: {
            min: 0,
            step: 1,
        },
        path: 'maxWidth',
    },
    slidesNumber: {
        label: { en: 'Number of slides', fr: 'Nombre de slides' },
        type: 'TextSelect',
        options: {
            options: [
                { value: '2', label: { en: '2', fr: '2' } },
                { value: '3', label: { en: '3', fr: '3' } },
                { value: '4', label: { en: '4', fr: '4' } },
                { value: '5', label: { en: '5', fr: '5' } },
                { value: '6', label: { en: '6', fr: '6' } },
                { value: '7', label: { en: '7', fr: '7' } },
                { value: '8', label: { en: '8', fr: '8' } },
                { value: '9', label: { en: '9', fr: '9' } },
                { value: '10', label: { en: '10', fr: '10' } },
            ],
        },
        path: 'slidesNumber',
    },
    transitionDuration: {
        type: 'Number',
        label: { en: 'Transition duration', fr: 'Durée de la transition' },
        options: {
            min: 0,
            max: 5,
            step: 0.1,
        },
        path: 'transitionDuration',
    },
    transitionFunction: {
        label: { en: 'Transition function', fr: 'Fonction de transition' },
        type: 'TextSelect',
        options: {
            options: [
                { value: 'ease', label: { en: 'ease', fr: 'ease' } },
                { value: 'ease-in', label: { en: 'ease-in', fr: 'ease-in' } },
                { value: 'ease-out', label: { en: 'ease-out', fr: 'ease-out' } },
                { value: 'ease-in-out', label: { en: 'ease-in-out', fr: 'ease-in-out' } },
                { value: 'linear', label: { en: 'linear', fr: 'linear' } },
            ],
        },
        path: 'transitionFunction',
    },
    automatic: {
        label: { en: 'Automatic', fr: 'Automatique' },
        type: 'OnOff',
        path: 'automatic',
    },
};

const AUTOMATIC_OPTIONS = {
    maxWidth: {
        label: {
            en: 'Max width',
            fr: 'Largeur maximale',
        },
        type: 'Number',
        options: {
            min: 0,
            step: 1,
        },
        path: 'maxWidth',
    },
    slidesNumber: {
        label: { en: 'Number of slides', fr: 'Nombre de slides' },
        type: 'TextSelect',
        options: {
            options: [
                { value: '1', label: { en: '1', fr: '1' } },
                { value: '2', label: { en: '2', fr: '2' } },
                { value: '3', label: { en: '3', fr: '3' } },
                { value: '4', label: { en: '4', fr: '4' } },
                { value: '5', label: { en: '5', fr: '5' } },
                { value: '6', label: { en: '6', fr: '6' } },
                { value: '7', label: { en: '7', fr: '7' } },
                { value: '8', label: { en: '8', fr: '8' } },
                { value: '9', label: { en: '9', fr: '9' } },
                { value: '10', label: { en: '10', fr: '10' } },
            ],
        },
        path: 'slidesNumber',
    },
    transitionDuration: {
        type: 'Number',
        label: { en: 'Transition duration', fr: 'Durée de la transition' },
        options: {
            min: 0,
            max: 5,
            step: 0.1,
        },
        path: 'transitionDuration',
    },
    transitionFunction: {
        label: { en: 'Transition function', fr: 'Fonction de transition' },
        type: 'TextSelect',
        options: {
            options: [
                { value: 'ease', label: { en: 'ease', fr: 'ease' } },
                { value: 'ease-in', label: { en: 'ease-in', fr: 'ease-in' } },
                { value: 'ease-out', label: { en: 'ease-out', fr: 'ease-out' } },
                { value: 'ease-in-out', label: { en: 'ease-in-out', fr: 'ease-in-out' } },
                { value: 'linear', label: { en: 'linear', fr: 'linear' } },
            ],
        },
        path: 'transitionFunction',
    },
    automatic: {
        label: { en: 'Automatic', fr: 'Automatique' },
        type: 'OnOff',
        path: 'automatic',
    },
    automaticSlideInterval: {
        type: 'Length',
        label: { en: 'Interval', fr: 'Interval' },
        options: {
            unitChoices: [{ value: 's', label: 's', min: 0, max: 20, step: 1 }],
        },
        path: 'automaticSlideInterval',
    },
};

export const getSettingsConfigurations = content => {
    return content.automatic
        ? { settingsOptions: { ...AUTOMATIC_OPTIONS } }
        : { settingsOptions: { ...BASIC_OPTIONS } };
};
