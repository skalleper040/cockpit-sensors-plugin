import React from 'react';
import { TableComposable, Tr, Th, Thead, Tbody } from '@patternfly/react-table';
import { Card, CardHeader, CardTitle, CardBody } from '@patternfly/react-core';
function Adaptor(props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {props.name}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <TableComposable variant="compact">
                    <Thead>
                        <Tr key={props.type}>
                            <Th key={props.type} colSpan="3">
                                <span>{props.type}</span>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.children}
                    </Tbody>
                </TableComposable>
            </CardBody>
        </Card>
    );
} export default Adaptor;
