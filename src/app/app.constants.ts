/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as colorbrewer from 'colorbrewer';

export const Step = {
    DATA: 0,
    SCHEMA: 1,
    STYLE: 2
};

// Maximum number of results to be returned by BigQuery API.
export const MAX_RESULTS = 500000;

// Maximum number of results to be shown in the HTML preview table.
export const MAX_RESULTS_PREVIEW = 10;

// How long to wait for the query to complete, in milliseconds, before the request times out and returns.
export const TIMEOUT_MS = 120000;

export const SAMPLE_PROJECT_ID = 'tmcdev';
export const SAMPLE_QUERY = `SELECT
namelsad as district_name,
string_field_1 as lead_1,
string_field_2 as lead_2,
-- ST_GeogPoint(cast(intptlon as float64),cast(intptlat as float64)) as pt,
-- ST_AsGeoJson(ST_GeogFromText(geotext)) as geojson
ST_GeogFromText(geotext) as geojson
FROM EXTERNAL_QUERY("tmcdev.us.db-yang", "select gid, statefp, cd116fp, geoid, namelsad, lsad, cdsessn, mtfcc, funcstat, aland, awater, intptlat, intptlon, st_astext(geom) as geotext from congressional_districts where statefp='06';") a
INNER JOIN \`tmcdev.yangdata.cdls\` b on (b.string_field_0=a.namelsad)
`;

export const SAMPLE_FILL_OPACITY = {isComputed: false, value: 0.8};
export const SAMPLE_FILL_COLOR = {
  isComputed: true,
  property: 'health',
  function: 'categorical',
  domain: ['Poor', 'Fair', 'Good'],
  range: ['#F44336', '#FFC107', '#4CAF50']
};
export const SAMPLE_CIRCLE_RADIUS = {
  isComputed: true,
  property: 'tree_dbh',
  function: 'linear',
  domain: [0, 500],
  range: [10, 50]
};

export const PALETTES = Object.keys(colorbrewer).map((key) => colorbrewer[key]);
