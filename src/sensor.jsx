import React from 'react';
import { Tr, Td } from '@patternfly/react-table';
function Sensor(props) {
    return (
        <Tr key={props.name}>
            <Td width={20} key={`${props.name}_name`}>
                <span>{props.name}</span>
            </Td>
            <Td width={20} key={`${props.name}_value`}>
                <span>{props.value}</span>
            </Td>
            <Td width={60} key={`${props.name}_info`}>
                <span>{props.info}</span>
            </Td>
        </Tr>
    );
} export default Sensor;
