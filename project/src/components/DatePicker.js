import React from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-gb');

const now = moment();
now.utcOffset(0);


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
    <TimePickerPanel
        defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
    />
);

function disabledDate(current) {
    if (!current) {
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
}

function disabledTime(time, type) {
    return {
        disabledHours() {
            return [];
        },
        disabledMinutes() {
            return [];
        },
        disabledSeconds() {
            return [];
        },
    };
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';
function format(v) {
    return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
    return v && v[0] && v[1];
}

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            hoverValue: [],
        };
    }

    onChange = (value) => {
        this.setState({ value });
    };

    onHoverChange = (hoverValue) => {
        this.setState({ hoverValue });
    };

    onSubmit = () => {
        let dates = {
            start: this.state.value[0]._d,
            end: this.state.value[1]._d
        };
        this.props.onDatesSelect(dates);
    };

    render() {
        const state = this.state;
        const calendar = (
            <RangeCalendar
                hoverValue={state.hoverValue}
                onHoverChange={this.onHoverChange}
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[now, now.clone().add(1, 'months')]}
                locale={enUS}
                disabledTime={disabledTime}
                disabledDate={disabledDate}
                timePicker={timePickerElement}
                onOk={this.onSubmit}
            />
        );
        return (
            <Picker
                value={state.value}
                onChange={this.onChange}
                animation="slide-up"
                calendar={calendar}
            >
                {
                    ({ value }) => {
                        return (<span>
                <input
                    placeholder="Trading period"
                    disabled={state.disabled}
                    readOnly
                    className="ant-calendar-picker-input ant-input"
                    value={isValidRange(value) && `${format(value[0])} - ${format(value[1])}` || ''}
                />
                </span>);
                    }
                }
            </Picker>);
    }
}