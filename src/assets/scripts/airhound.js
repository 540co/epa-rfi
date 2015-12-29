// Custom js for Air Hound

// Chart JS global config options
Chart.defaults.global.scaleLabel = function (label) {
    return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Chart.defaults.global.multiTooltipTemplate = function (label) {
    return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
