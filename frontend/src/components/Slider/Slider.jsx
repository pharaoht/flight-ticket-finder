import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value} hours`;
}

export default function RangeSlider(props) {
    let endMax;
    let start;
    let end;

    if (props.single === true) {
        start = props.start
        end = props.end
        if (props.savedMax !== undefined) {
            endMax = props.savedMax;
        } else {
            endMax = props.end
        }
    }
    else {
        endMax = [0, 23]
        start = 0
        end = 23
    }

    const [value, setValue] = React.useState(endMax);

    const handleChange = (event, newValue) => {
        if (props.single === true) {
            setValue(newValue);
            props.updateDuration(newValue)
        }
        else {
            if (props.return === false) {
                setValue(newValue);
                props.updateOb(event.target.value);
            }
            else {
                setValue(newValue)
                props.updateReturn(event.target.value)
            }

        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelFormat={valuetext}
                min={start}
                max={end}
                disableSwap
            />
        </Box>
    );
}

