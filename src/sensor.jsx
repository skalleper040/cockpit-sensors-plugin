import React from 'react';
import { Tr, Td } from '@patternfly/react-table';
import { Progress, ProgressMeasureLocation, ProgressVariant } from '@patternfly/react-core';
function Sensor(props) {
    return (
        <Tr key={props.name}>
            <Td width={30} key={`${props.name}_name`}>
                {props.name}
            </Td>
            <Td width={70} key={`${props.name}_value`}>
                {props.type == "fan" ? props.value + " RPM"
                    : <Progress
                        value={props.value}
                        className="pf-m-sm"
                        min={0} max={100}
                        variant={props.value > 90 ? ProgressVariant.danger : ProgressVariant.info}
                        label={props.value + ' °C'}
                        measureLocation={ProgressMeasureLocation.outside}
                    />}
            </Td>
        </Tr>
    );
} export default Sensor;
