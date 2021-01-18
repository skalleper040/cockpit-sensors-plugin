import React from 'react';
import { TableComposable, Tr, Th, Thead, Tbody } from '@patternfly/react-table';
import { FlexItem, Card, CardHeader, CardTitle, CardBody } from '@patternfly/react-core';
function Adaptor(props) {
    return (
        <FlexItem flex={{ default: 'flex_1' }}>
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
                                <Th key={props.type} colSpan="2">
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
        </FlexItem>
    );
} export default Adaptor;
