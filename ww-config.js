export default {
    "editor": {
        "label": {
            "en": "Callisto slider",
            "fr": "Slider Callisto"
        }
    },
    properties: {
        slidesNumber: {
            label: { en: 'Number of slides', fr: 'Nombre de slides' },
            type: 'TextSelect',
            section: 'settings',
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
            defaultValue: '3'
        },
        slideToEdit: {
            label: { en: 'Slide to edit', fr: 'Slide to edit' },
            type: 'TextSelect',
            section: 'settings',
            options: (content) => {
                const options = [];

                for (let i = 1; i <= content.slidesNumber; i++) {
                    const slide = i.toString();
                    options.push({ value: slide, label: { en: slide, fr: slide } });
                }

                return options
            },
        },
        transitionDuration: {
            label: { en: 'Transition duration', fr: 'Durée de la transition' },
            type: 'Number',
            section: 'settings',
            options: {
                min: 0,
                max: 5,
                step: 0.1,
            },
            defaultValue: 0.8
        },
        transitionFunction: {
            label: { en: 'Transition function', fr: 'Fonction de transition' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'ease', label: { en: 'ease', fr: 'ease' } },
                    { value: 'ease-in', label: { en: 'ease-in', fr: 'ease-in' } },
                    { value: 'ease-out', label: { en: 'ease-out', fr: 'ease-out' } },
                    { value: 'ease-in-out', label: { en: 'ease-in-out', fr: 'ease-in-out' } },
                    { value: 'linear', label: { en: 'linear', fr: 'linear' } },
                ],
            },
            defaultValue: 'ease'
        },
        automatic: {
            label: { en: 'Automatic', fr: 'Automatique' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false
        },
        automaticSlideInterval: {
            hidden: (content) => {
                return content.automatic
            },
            type: 'Length',
            label: { en: 'Interval', fr: 'Interval' },
            section: 'settings',
            options: {
                unitChoices: [{ value: 's', label: 's', min: 0, max: 20, step: 1 }],
            },
            defaultValue: '5s'
        },
        top: {
            hidden: true,
            defaultValue: []
        },
        bottom: {
            hidden: true,
            defaultValue: []
        },
        slides: {
            hidden: true,
            defaultValue: []
        },
        next: {
            hidden: true,
            defaultValue: []
        }
    }
}
