import ReactWeather, { useVisualCrossing } from 'react-open-weather';

const ReactWeatherComponent = () => {
    /*
    const { data, isLoading, errorMessage } = useWeatherBit({
        key: '046f513311a64da882b6a3704b15843f',
        lat: '30.6280',
        lon: '96.3344',
        lang: 'en',
        unit: 'I', // values are (M,S,I)
    });
    */
    const { data, isLoading, errorMessage } = useVisualCrossing({
        key: '2TT6CDXG43PBKCTEWSF5HNA7J',
        lat: '30.6280',
        lon: '-96.314445',
        lang: 'en',
        unit: 'us', // values are (metric,us,uk)
    });
    const customStyles = {
        fontFamily: 'Helvetica, sans-serif',
        gradientStart: '#0181C2',
        gradientMid: '#04A7F9',
        gradientEnd: '#4BC4F7',
        locationFontColor: '#FFF',
        todayTempFontColor: '#FFF',
        todayDateFontColor: '#B5DEF4',
        todayRangeFontColor: '#B5DEF4',
        todayDescFontColor: '#B5DEF4',
        todayInfoFontColor: '#B5DEF4',
        todayIconColor: '#FFF',
        forecastBackgroundColor: '#FFF',
        forecastSeparatorColor: '#DDD',
        forecastDateColor: '#777',
        forecastDescColor: '#777',
        forecastRangeColor: '#777',
        forecastIconColor: '#4BC4F7',
    };
    return (
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel="College Station"
            unitsLabels={{ temperature: 'F', windSpeed: 'mph' }}
            showForecast
            theme={customStyles}
            height='250px'
        />
    );
};

export default ReactWeatherComponent;