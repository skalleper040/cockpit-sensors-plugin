/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import Adaptor from './adaptor.jsx';
import Sensor from './sensor.jsx';
import { Page, PageSection } from '@patternfly/react-core';

export class Application extends React.Component {
    constructor() {
        super();
        this.state = { adaptors: [] };
        this.getSensors();
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.getSensors();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getSensors() {
        cockpit.spawn(["sensors"]).stream(content => {
            var adaptors = [];
            var lines = content.split('\n');
            var i = 0;
            while (i < lines.length && lines[i] != '') {
                var current_adaptor = {};
                current_adaptor.name = lines[i];
                current_adaptor.type = lines[i + 1];
                current_adaptor.sensors = [];
                var j = i + 2;
                while (j < lines.length && lines[j] != '') {
                    var sensor = {};
                    var stringStartIndex = lines[j].indexOf(':');
                    var stringEndIndex = lines[j].indexOf('(');
                    sensor.name = lines[j].substring(0, stringStartIndex);
                    sensor.value = lines[j].substring(stringStartIndex + 1, (stringEndIndex > -1 ? stringEndIndex : lines[j].length)).trim();
                    sensor.info = stringEndIndex > -1 ? lines[j].substring(stringEndIndex) : null;
                    j++;
                    while (lines[j].startsWith(' ')) {
                        sensor.info += " " + lines[j].trimStart();
                        j++;
                    }
                    current_adaptor.sensors.push(sensor);
                }
                adaptors.push(current_adaptor);
                i = j + 1;
            }
            this.setState({ adaptors: adaptors });
        });
    }

    render() {
        return (
            <Page>
                <PageSection>
                    {this.state.adaptors.map((adaptor) =>
                        <Adaptor key={adaptor.name} name={adaptor.name} type={adaptor.type}>
                            {adaptor.sensors.map((sensor) =>
                                <Sensor key={sensor.name} name={sensor.name} value={sensor.value} info={sensor.info} />
                            )}
                        </Adaptor>
                    )}
                </PageSection>
            </Page>
        );
    }
}
