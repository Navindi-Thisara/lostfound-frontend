module.exports = {
    jest: (config) => {
        config.transformIgnorePatterns = [
            "node_modules/(?!(axios)/)"
        ];
        return config;
    }
};
