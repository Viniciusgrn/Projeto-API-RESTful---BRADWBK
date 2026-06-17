/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 1737.0, "series": [{"data": [[0.0, 10.0], [0.1, 14.0], [0.2, 17.0], [0.3, 17.0], [0.4, 18.0], [0.5, 19.0], [0.6, 20.0], [0.7, 20.0], [0.8, 20.0], [0.9, 21.0], [1.0, 21.0], [1.1, 21.0], [1.2, 22.0], [1.3, 22.0], [1.4, 23.0], [1.5, 23.0], [1.6, 23.0], [1.7, 23.0], [1.8, 24.0], [1.9, 24.0], [2.0, 24.0], [2.1, 24.0], [2.2, 24.0], [2.3, 25.0], [2.4, 25.0], [2.5, 25.0], [2.6, 25.0], [2.7, 25.0], [2.8, 26.0], [2.9, 26.0], [3.0, 26.0], [3.1, 26.0], [3.2, 26.0], [3.3, 26.0], [3.4, 26.0], [3.5, 27.0], [3.6, 27.0], [3.7, 27.0], [3.8, 27.0], [3.9, 27.0], [4.0, 28.0], [4.1, 28.0], [4.2, 28.0], [4.3, 28.0], [4.4, 28.0], [4.5, 28.0], [4.6, 29.0], [4.7, 29.0], [4.8, 29.0], [4.9, 29.0], [5.0, 29.0], [5.1, 29.0], [5.2, 30.0], [5.3, 30.0], [5.4, 30.0], [5.5, 30.0], [5.6, 30.0], [5.7, 30.0], [5.8, 30.0], [5.9, 31.0], [6.0, 31.0], [6.1, 31.0], [6.2, 31.0], [6.3, 32.0], [6.4, 32.0], [6.5, 32.0], [6.6, 32.0], [6.7, 32.0], [6.8, 33.0], [6.9, 33.0], [7.0, 33.0], [7.1, 33.0], [7.2, 33.0], [7.3, 33.0], [7.4, 33.0], [7.5, 34.0], [7.6, 34.0], [7.7, 34.0], [7.8, 34.0], [7.9, 35.0], [8.0, 35.0], [8.1, 35.0], [8.2, 36.0], [8.3, 36.0], [8.4, 36.0], [8.5, 37.0], [8.6, 37.0], [8.7, 37.0], [8.8, 38.0], [8.9, 38.0], [9.0, 39.0], [9.1, 39.0], [9.2, 39.0], [9.3, 40.0], [9.4, 40.0], [9.5, 40.0], [9.6, 40.0], [9.7, 41.0], [9.8, 41.0], [9.9, 42.0], [10.0, 42.0], [10.1, 43.0], [10.2, 44.0], [10.3, 44.0], [10.4, 46.0], [10.5, 46.0], [10.6, 46.0], [10.7, 47.0], [10.8, 48.0], [10.9, 49.0], [11.0, 49.0], [11.1, 50.0], [11.2, 51.0], [11.3, 52.0], [11.4, 52.0], [11.5, 53.0], [11.6, 53.0], [11.7, 55.0], [11.8, 56.0], [11.9, 57.0], [12.0, 58.0], [12.1, 59.0], [12.2, 59.0], [12.3, 60.0], [12.4, 61.0], [12.5, 62.0], [12.6, 63.0], [12.7, 64.0], [12.8, 66.0], [12.9, 68.0], [13.0, 71.0], [13.1, 71.0], [13.2, 73.0], [13.3, 74.0], [13.4, 75.0], [13.5, 77.0], [13.6, 78.0], [13.7, 79.0], [13.8, 81.0], [13.9, 83.0], [14.0, 83.0], [14.1, 84.0], [14.2, 85.0], [14.3, 86.0], [14.4, 87.0], [14.5, 88.0], [14.6, 91.0], [14.7, 91.0], [14.8, 93.0], [14.9, 94.0], [15.0, 95.0], [15.1, 95.0], [15.2, 96.0], [15.3, 98.0], [15.4, 100.0], [15.5, 103.0], [15.6, 104.0], [15.7, 106.0], [15.8, 106.0], [15.9, 106.0], [16.0, 107.0], [16.1, 108.0], [16.2, 109.0], [16.3, 111.0], [16.4, 112.0], [16.5, 113.0], [16.6, 113.0], [16.7, 114.0], [16.8, 114.0], [16.9, 115.0], [17.0, 116.0], [17.1, 117.0], [17.2, 118.0], [17.3, 119.0], [17.4, 119.0], [17.5, 120.0], [17.6, 120.0], [17.7, 122.0], [17.8, 122.0], [17.9, 123.0], [18.0, 124.0], [18.1, 125.0], [18.2, 125.0], [18.3, 126.0], [18.4, 127.0], [18.5, 128.0], [18.6, 128.0], [18.7, 129.0], [18.8, 130.0], [18.9, 131.0], [19.0, 131.0], [19.1, 131.0], [19.2, 133.0], [19.3, 133.0], [19.4, 134.0], [19.5, 134.0], [19.6, 135.0], [19.7, 136.0], [19.8, 136.0], [19.9, 137.0], [20.0, 138.0], [20.1, 139.0], [20.2, 139.0], [20.3, 140.0], [20.4, 141.0], [20.5, 141.0], [20.6, 142.0], [20.7, 143.0], [20.8, 144.0], [20.9, 145.0], [21.0, 145.0], [21.1, 146.0], [21.2, 146.0], [21.3, 147.0], [21.4, 148.0], [21.5, 149.0], [21.6, 149.0], [21.7, 150.0], [21.8, 151.0], [21.9, 151.0], [22.0, 152.0], [22.1, 153.0], [22.2, 153.0], [22.3, 154.0], [22.4, 155.0], [22.5, 155.0], [22.6, 156.0], [22.7, 157.0], [22.8, 158.0], [22.9, 159.0], [23.0, 159.0], [23.1, 159.0], [23.2, 159.0], [23.3, 160.0], [23.4, 161.0], [23.5, 162.0], [23.6, 162.0], [23.7, 163.0], [23.8, 164.0], [23.9, 164.0], [24.0, 165.0], [24.1, 166.0], [24.2, 167.0], [24.3, 169.0], [24.4, 171.0], [24.5, 172.0], [24.6, 173.0], [24.7, 173.0], [24.8, 174.0], [24.9, 175.0], [25.0, 176.0], [25.1, 179.0], [25.2, 179.0], [25.3, 180.0], [25.4, 181.0], [25.5, 182.0], [25.6, 183.0], [25.7, 184.0], [25.8, 186.0], [25.9, 187.0], [26.0, 187.0], [26.1, 188.0], [26.2, 188.0], [26.3, 190.0], [26.4, 192.0], [26.5, 194.0], [26.6, 194.0], [26.7, 195.0], [26.8, 196.0], [26.9, 196.0], [27.0, 197.0], [27.1, 197.0], [27.2, 197.0], [27.3, 198.0], [27.4, 199.0], [27.5, 199.0], [27.6, 200.0], [27.7, 200.0], [27.8, 201.0], [27.9, 202.0], [28.0, 202.0], [28.1, 203.0], [28.2, 204.0], [28.3, 205.0], [28.4, 205.0], [28.5, 206.0], [28.6, 206.0], [28.7, 206.0], [28.8, 207.0], [28.9, 207.0], [29.0, 207.0], [29.1, 208.0], [29.2, 208.0], [29.3, 209.0], [29.4, 209.0], [29.5, 210.0], [29.6, 210.0], [29.7, 210.0], [29.8, 211.0], [29.9, 212.0], [30.0, 212.0], [30.1, 213.0], [30.2, 213.0], [30.3, 213.0], [30.4, 214.0], [30.5, 214.0], [30.6, 215.0], [30.7, 215.0], [30.8, 216.0], [30.9, 216.0], [31.0, 216.0], [31.1, 217.0], [31.2, 217.0], [31.3, 217.0], [31.4, 218.0], [31.5, 219.0], [31.6, 219.0], [31.7, 219.0], [31.8, 220.0], [31.9, 220.0], [32.0, 221.0], [32.1, 222.0], [32.2, 222.0], [32.3, 223.0], [32.4, 223.0], [32.5, 223.0], [32.6, 224.0], [32.7, 224.0], [32.8, 225.0], [32.9, 225.0], [33.0, 226.0], [33.1, 227.0], [33.2, 227.0], [33.3, 227.0], [33.4, 228.0], [33.5, 228.0], [33.6, 228.0], [33.7, 229.0], [33.8, 229.0], [33.9, 229.0], [34.0, 230.0], [34.1, 230.0], [34.2, 230.0], [34.3, 230.0], [34.4, 231.0], [34.5, 232.0], [34.6, 232.0], [34.7, 232.0], [34.8, 232.0], [34.9, 233.0], [35.0, 233.0], [35.1, 233.0], [35.2, 233.0], [35.3, 234.0], [35.4, 234.0], [35.5, 234.0], [35.6, 235.0], [35.7, 236.0], [35.8, 236.0], [35.9, 236.0], [36.0, 237.0], [36.1, 237.0], [36.2, 238.0], [36.3, 238.0], [36.4, 238.0], [36.5, 238.0], [36.6, 239.0], [36.7, 239.0], [36.8, 239.0], [36.9, 239.0], [37.0, 240.0], [37.1, 240.0], [37.2, 240.0], [37.3, 241.0], [37.4, 241.0], [37.5, 241.0], [37.6, 241.0], [37.7, 242.0], [37.8, 242.0], [37.9, 242.0], [38.0, 242.0], [38.1, 243.0], [38.2, 243.0], [38.3, 243.0], [38.4, 244.0], [38.5, 244.0], [38.6, 244.0], [38.7, 244.0], [38.8, 245.0], [38.9, 245.0], [39.0, 245.0], [39.1, 246.0], [39.2, 246.0], [39.3, 246.0], [39.4, 246.0], [39.5, 247.0], [39.6, 247.0], [39.7, 247.0], [39.8, 247.0], [39.9, 248.0], [40.0, 248.0], [40.1, 248.0], [40.2, 248.0], [40.3, 248.0], [40.4, 248.0], [40.5, 249.0], [40.6, 249.0], [40.7, 250.0], [40.8, 250.0], [40.9, 250.0], [41.0, 250.0], [41.1, 250.0], [41.2, 251.0], [41.3, 251.0], [41.4, 251.0], [41.5, 252.0], [41.6, 252.0], [41.7, 252.0], [41.8, 252.0], [41.9, 253.0], [42.0, 253.0], [42.1, 253.0], [42.2, 254.0], [42.3, 254.0], [42.4, 254.0], [42.5, 254.0], [42.6, 255.0], [42.7, 255.0], [42.8, 256.0], [42.9, 256.0], [43.0, 256.0], [43.1, 256.0], [43.2, 257.0], [43.3, 257.0], [43.4, 257.0], [43.5, 258.0], [43.6, 258.0], [43.7, 258.0], [43.8, 258.0], [43.9, 259.0], [44.0, 259.0], [44.1, 260.0], [44.2, 260.0], [44.3, 260.0], [44.4, 261.0], [44.5, 261.0], [44.6, 262.0], [44.7, 262.0], [44.8, 262.0], [44.9, 263.0], [45.0, 263.0], [45.1, 263.0], [45.2, 264.0], [45.3, 264.0], [45.4, 265.0], [45.5, 265.0], [45.6, 265.0], [45.7, 265.0], [45.8, 266.0], [45.9, 266.0], [46.0, 267.0], [46.1, 267.0], [46.2, 267.0], [46.3, 267.0], [46.4, 268.0], [46.5, 268.0], [46.6, 268.0], [46.7, 269.0], [46.8, 269.0], [46.9, 270.0], [47.0, 270.0], [47.1, 270.0], [47.2, 270.0], [47.3, 271.0], [47.4, 271.0], [47.5, 272.0], [47.6, 272.0], [47.7, 272.0], [47.8, 272.0], [47.9, 272.0], [48.0, 273.0], [48.1, 273.0], [48.2, 273.0], [48.3, 274.0], [48.4, 274.0], [48.5, 275.0], [48.6, 275.0], [48.7, 275.0], [48.8, 276.0], [48.9, 276.0], [49.0, 276.0], [49.1, 277.0], [49.2, 277.0], [49.3, 277.0], [49.4, 278.0], [49.5, 279.0], [49.6, 279.0], [49.7, 279.0], [49.8, 280.0], [49.9, 280.0], [50.0, 280.0], [50.1, 281.0], [50.2, 281.0], [50.3, 282.0], [50.4, 282.0], [50.5, 283.0], [50.6, 284.0], [50.7, 285.0], [50.8, 285.0], [50.9, 286.0], [51.0, 287.0], [51.1, 288.0], [51.2, 288.0], [51.3, 288.0], [51.4, 289.0], [51.5, 290.0], [51.6, 291.0], [51.7, 292.0], [51.8, 293.0], [51.9, 294.0], [52.0, 296.0], [52.1, 296.0], [52.2, 297.0], [52.3, 299.0], [52.4, 301.0], [52.5, 302.0], [52.6, 306.0], [52.7, 309.0], [52.8, 310.0], [52.9, 312.0], [53.0, 315.0], [53.1, 319.0], [53.2, 322.0], [53.3, 327.0], [53.4, 329.0], [53.5, 331.0], [53.6, 332.0], [53.7, 334.0], [53.8, 335.0], [53.9, 335.0], [54.0, 338.0], [54.1, 340.0], [54.2, 341.0], [54.3, 342.0], [54.4, 345.0], [54.5, 346.0], [54.6, 347.0], [54.7, 347.0], [54.8, 350.0], [54.9, 351.0], [55.0, 352.0], [55.1, 354.0], [55.2, 354.0], [55.3, 354.0], [55.4, 356.0], [55.5, 356.0], [55.6, 357.0], [55.7, 358.0], [55.8, 359.0], [55.9, 360.0], [56.0, 362.0], [56.1, 363.0], [56.2, 363.0], [56.3, 365.0], [56.4, 365.0], [56.5, 366.0], [56.6, 367.0], [56.7, 368.0], [56.8, 369.0], [56.9, 370.0], [57.0, 372.0], [57.1, 373.0], [57.2, 376.0], [57.3, 378.0], [57.4, 380.0], [57.5, 381.0], [57.6, 382.0], [57.7, 383.0], [57.8, 385.0], [57.9, 385.0], [58.0, 387.0], [58.1, 388.0], [58.2, 390.0], [58.3, 393.0], [58.4, 394.0], [58.5, 395.0], [58.6, 396.0], [58.7, 397.0], [58.8, 398.0], [58.9, 398.0], [59.0, 400.0], [59.1, 402.0], [59.2, 403.0], [59.3, 405.0], [59.4, 406.0], [59.5, 407.0], [59.6, 408.0], [59.7, 409.0], [59.8, 411.0], [59.9, 412.0], [60.0, 414.0], [60.1, 414.0], [60.2, 415.0], [60.3, 416.0], [60.4, 416.0], [60.5, 417.0], [60.6, 420.0], [60.7, 420.0], [60.8, 421.0], [60.9, 421.0], [61.0, 423.0], [61.1, 423.0], [61.2, 424.0], [61.3, 425.0], [61.4, 426.0], [61.5, 427.0], [61.6, 427.0], [61.7, 428.0], [61.8, 428.0], [61.9, 430.0], [62.0, 430.0], [62.1, 430.0], [62.2, 431.0], [62.3, 431.0], [62.4, 432.0], [62.5, 432.0], [62.6, 433.0], [62.7, 433.0], [62.8, 434.0], [62.9, 435.0], [63.0, 436.0], [63.1, 436.0], [63.2, 436.0], [63.3, 437.0], [63.4, 438.0], [63.5, 438.0], [63.6, 438.0], [63.7, 438.0], [63.8, 438.0], [63.9, 439.0], [64.0, 439.0], [64.1, 439.0], [64.2, 439.0], [64.3, 440.0], [64.4, 440.0], [64.5, 441.0], [64.6, 441.0], [64.7, 442.0], [64.8, 442.0], [64.9, 442.0], [65.0, 443.0], [65.1, 443.0], [65.2, 444.0], [65.3, 445.0], [65.4, 446.0], [65.5, 446.0], [65.6, 447.0], [65.7, 448.0], [65.8, 448.0], [65.9, 448.0], [66.0, 449.0], [66.1, 449.0], [66.2, 450.0], [66.3, 451.0], [66.4, 451.0], [66.5, 451.0], [66.6, 452.0], [66.7, 453.0], [66.8, 453.0], [66.9, 453.0], [67.0, 454.0], [67.1, 454.0], [67.2, 454.0], [67.3, 455.0], [67.4, 456.0], [67.5, 457.0], [67.6, 457.0], [67.7, 457.0], [67.8, 458.0], [67.9, 458.0], [68.0, 458.0], [68.1, 459.0], [68.2, 459.0], [68.3, 459.0], [68.4, 460.0], [68.5, 461.0], [68.6, 461.0], [68.7, 461.0], [68.8, 462.0], [68.9, 462.0], [69.0, 463.0], [69.1, 464.0], [69.2, 465.0], [69.3, 465.0], [69.4, 465.0], [69.5, 466.0], [69.6, 466.0], [69.7, 467.0], [69.8, 467.0], [69.9, 467.0], [70.0, 468.0], [70.1, 469.0], [70.2, 470.0], [70.3, 470.0], [70.4, 471.0], [70.5, 472.0], [70.6, 472.0], [70.7, 473.0], [70.8, 473.0], [70.9, 474.0], [71.0, 474.0], [71.1, 475.0], [71.2, 475.0], [71.3, 475.0], [71.4, 476.0], [71.5, 476.0], [71.6, 477.0], [71.7, 477.0], [71.8, 478.0], [71.9, 478.0], [72.0, 478.0], [72.1, 478.0], [72.2, 478.0], [72.3, 479.0], [72.4, 479.0], [72.5, 480.0], [72.6, 480.0], [72.7, 481.0], [72.8, 481.0], [72.9, 482.0], [73.0, 483.0], [73.1, 483.0], [73.2, 483.0], [73.3, 484.0], [73.4, 484.0], [73.5, 485.0], [73.6, 485.0], [73.7, 485.0], [73.8, 485.0], [73.9, 486.0], [74.0, 487.0], [74.1, 487.0], [74.2, 488.0], [74.3, 488.0], [74.4, 488.0], [74.5, 488.0], [74.6, 489.0], [74.7, 489.0], [74.8, 490.0], [74.9, 490.0], [75.0, 491.0], [75.1, 491.0], [75.2, 491.0], [75.3, 492.0], [75.4, 492.0], [75.5, 493.0], [75.6, 493.0], [75.7, 493.0], [75.8, 494.0], [75.9, 495.0], [76.0, 495.0], [76.1, 496.0], [76.2, 497.0], [76.3, 497.0], [76.4, 498.0], [76.5, 499.0], [76.6, 499.0], [76.7, 500.0], [76.8, 500.0], [76.9, 501.0], [77.0, 502.0], [77.1, 502.0], [77.2, 503.0], [77.3, 504.0], [77.4, 505.0], [77.5, 507.0], [77.6, 507.0], [77.7, 508.0], [77.8, 509.0], [77.9, 509.0], [78.0, 510.0], [78.1, 511.0], [78.2, 512.0], [78.3, 513.0], [78.4, 513.0], [78.5, 515.0], [78.6, 516.0], [78.7, 517.0], [78.8, 517.0], [78.9, 518.0], [79.0, 519.0], [79.1, 520.0], [79.2, 521.0], [79.3, 523.0], [79.4, 524.0], [79.5, 527.0], [79.6, 529.0], [79.7, 530.0], [79.8, 531.0], [79.9, 532.0], [80.0, 535.0], [80.1, 537.0], [80.2, 539.0], [80.3, 545.0], [80.4, 553.0], [80.5, 569.0], [80.6, 574.0], [80.7, 577.0], [80.8, 584.0], [80.9, 587.0], [81.0, 589.0], [81.1, 592.0], [81.2, 596.0], [81.3, 598.0], [81.4, 601.0], [81.5, 605.0], [81.6, 609.0], [81.7, 614.0], [81.8, 615.0], [81.9, 617.0], [82.0, 619.0], [82.1, 622.0], [82.2, 624.0], [82.3, 625.0], [82.4, 631.0], [82.5, 632.0], [82.6, 634.0], [82.7, 635.0], [82.8, 637.0], [82.9, 639.0], [83.0, 640.0], [83.1, 641.0], [83.2, 642.0], [83.3, 645.0], [83.4, 647.0], [83.5, 648.0], [83.6, 649.0], [83.7, 651.0], [83.8, 652.0], [83.9, 654.0], [84.0, 655.0], [84.1, 658.0], [84.2, 660.0], [84.3, 662.0], [84.4, 662.0], [84.5, 663.0], [84.6, 665.0], [84.7, 666.0], [84.8, 667.0], [84.9, 668.0], [85.0, 669.0], [85.1, 669.0], [85.2, 672.0], [85.3, 672.0], [85.4, 673.0], [85.5, 673.0], [85.6, 674.0], [85.7, 676.0], [85.8, 676.0], [85.9, 677.0], [86.0, 678.0], [86.1, 678.0], [86.2, 679.0], [86.3, 680.0], [86.4, 680.0], [86.5, 681.0], [86.6, 682.0], [86.7, 683.0], [86.8, 683.0], [86.9, 684.0], [87.0, 685.0], [87.1, 686.0], [87.2, 687.0], [87.3, 688.0], [87.4, 688.0], [87.5, 689.0], [87.6, 689.0], [87.7, 690.0], [87.8, 691.0], [87.9, 691.0], [88.0, 692.0], [88.1, 693.0], [88.2, 693.0], [88.3, 694.0], [88.4, 695.0], [88.5, 696.0], [88.6, 696.0], [88.7, 697.0], [88.8, 698.0], [88.9, 698.0], [89.0, 699.0], [89.1, 700.0], [89.2, 700.0], [89.3, 701.0], [89.4, 701.0], [89.5, 702.0], [89.6, 704.0], [89.7, 704.0], [89.8, 705.0], [89.9, 706.0], [90.0, 707.0], [90.1, 708.0], [90.2, 709.0], [90.3, 710.0], [90.4, 710.0], [90.5, 711.0], [90.6, 712.0], [90.7, 713.0], [90.8, 715.0], [90.9, 717.0], [91.0, 718.0], [91.1, 721.0], [91.2, 721.0], [91.3, 722.0], [91.4, 723.0], [91.5, 724.0], [91.6, 725.0], [91.7, 727.0], [91.8, 729.0], [91.9, 732.0], [92.0, 734.0], [92.1, 737.0], [92.2, 740.0], [92.3, 746.0], [92.4, 750.0], [92.5, 751.0], [92.6, 759.0], [92.7, 762.0], [92.8, 768.0], [92.9, 778.0], [93.0, 807.0], [93.1, 814.0], [93.2, 819.0], [93.3, 826.0], [93.4, 832.0], [93.5, 837.0], [93.6, 842.0], [93.7, 847.0], [93.8, 857.0], [93.9, 864.0], [94.0, 868.0], [94.1, 869.0], [94.2, 871.0], [94.3, 874.0], [94.4, 880.0], [94.5, 882.0], [94.6, 885.0], [94.7, 886.0], [94.8, 888.0], [94.9, 889.0], [95.0, 890.0], [95.1, 892.0], [95.2, 893.0], [95.3, 894.0], [95.4, 896.0], [95.5, 899.0], [95.6, 901.0], [95.7, 903.0], [95.8, 906.0], [95.9, 907.0], [96.0, 910.0], [96.1, 910.0], [96.2, 912.0], [96.3, 915.0], [96.4, 919.0], [96.5, 924.0], [96.6, 928.0], [96.7, 932.0], [96.8, 934.0], [96.9, 934.0], [97.0, 937.0], [97.1, 940.0], [97.2, 941.0], [97.3, 945.0], [97.4, 947.0], [97.5, 949.0], [97.6, 951.0], [97.7, 963.0], [97.8, 971.0], [97.9, 988.0], [98.0, 1022.0], [98.1, 1042.0], [98.2, 1064.0], [98.3, 1078.0], [98.4, 1081.0], [98.5, 1098.0], [98.6, 1105.0], [98.7, 1111.0], [98.8, 1128.0], [98.9, 1137.0], [99.0, 1146.0], [99.1, 1153.0], [99.2, 1162.0], [99.3, 1172.0], [99.4, 1185.0], [99.5, 1293.0], [99.6, 1318.0], [99.7, 1334.0], [99.8, 1391.0], [99.9, 1548.0], [100.0, 1737.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 990.0, "series": [{"data": [[0.0, 614.0], [600.0, 308.0], [700.0, 156.0], [200.0, 990.0], [800.0, 102.0], [900.0, 97.0], [1000.0, 22.0], [1100.0, 37.0], [300.0, 265.0], [1200.0, 5.0], [1300.0, 10.0], [1400.0, 2.0], [1500.0, 5.0], [100.0, 488.0], [400.0, 708.0], [1700.0, 1.0], [500.0, 190.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 3075.0, "series": [{"data": [[0.0, 3075.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 919.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 6.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 126.78025000000007, "minX": 1.78166358E12, "maxY": 126.78025000000007, "series": [{"data": [[1.78166358E12, 126.78025000000007]], "isOverall": false, "label": "Feed - 50 usuarios", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166358E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 10.0, "minX": 1.0, "maxY": 554.9846153846154, "series": [{"data": [[2.0, 10.0], [3.0, 11.0], [4.0, 25.0], [5.0, 35.0], [6.0, 24.666666666666668], [7.0, 34.5], [8.0, 69.5], [9.0, 51.375], [10.0, 43.0], [11.0, 49.33333333333333], [12.0, 42.0], [13.0, 46.285714285714285], [14.0, 67.0], [15.0, 55.99999999999999], [16.0, 51.57142857142857], [17.0, 60.12500000000001], [18.0, 61.22222222222221], [19.0, 45.833333333333336], [20.0, 74.23076923076924], [21.0, 75.60000000000001], [22.0, 76.0], [23.0, 81.875], [24.0, 80.2], [25.0, 78.61538461538461], [26.0, 112.08333333333333], [27.0, 95.66666666666667], [28.0, 80.60000000000001], [29.0, 99.0], [30.0, 121.5], [31.0, 123.41666666666667], [32.0, 142.8], [33.0, 130.9090909090909], [34.0, 117.33333333333333], [35.0, 121.38461538461539], [36.0, 109.25], [37.0, 150.44444444444446], [38.0, 140.0], [39.0, 152.55555555555554], [40.0, 143.66666666666666], [41.0, 148.70000000000002], [42.0, 141.0], [43.0, 172.36363636363635], [44.0, 121.0], [45.0, 142.8], [46.0, 173.0909090909091], [47.0, 207.66666666666666], [48.0, 121.7], [49.0, 166.66666666666666], [50.0, 219.24999999999997], [51.0, 199.10000000000002], [52.0, 190.43750000000003], [53.0, 193.00000000000003], [54.0, 179.54545454545453], [55.0, 173.11111111111114], [56.0, 192.125], [57.0, 185.5], [58.0, 223.9], [59.0, 145.25], [60.0, 212.74999999999997], [61.0, 175.5], [62.0, 161.87499999999997], [63.0, 170.8235294117647], [64.0, 205.37499999999997], [65.0, 272.58333333333337], [66.0, 233.375], [67.0, 182.04761904761904], [68.0, 230.2], [69.0, 187.77777777777777], [70.0, 191.77777777777774], [71.0, 129.7], [72.0, 189.6], [73.0, 255.77777777777777], [74.0, 238.27272727272725], [75.0, 193.79999999999998], [76.0, 182.125], [77.0, 245.0789473684211], [78.0, 310.41666666666663], [79.0, 184.1818181818182], [80.0, 244.75], [81.0, 228.66666666666663], [82.0, 217.125], [83.0, 246.45833333333331], [84.0, 236.26666666666668], [85.0, 256.4], [86.0, 197.27272727272728], [87.0, 248.0666666666667], [88.0, 202.7], [89.0, 205.27272727272728], [90.0, 238.0], [91.0, 227.4], [92.0, 263.90000000000003], [93.0, 227.64705882352936], [94.0, 255.67647058823528], [95.0, 306.1428571428571], [96.0, 272.7931034482758], [97.0, 262.36], [98.0, 200.0], [99.0, 323.2666666666667], [100.0, 282.375], [101.0, 251.1], [102.0, 317.0833333333333], [103.0, 423.66666666666663], [104.0, 260.0], [105.0, 247.8888888888889], [106.0, 355.3636363636364], [107.0, 273.4], [108.0, 267.70588235294116], [109.0, 314.5238095238096], [110.0, 319.60869565217394], [111.0, 304.6875], [112.0, 274.5], [113.0, 358.77777777777777], [114.0, 214.59999999999997], [115.0, 373.2857142857142], [116.0, 246.37499999999997], [117.0, 320.842105263158], [118.0, 430.3636363636363], [119.0, 410.7368421052632], [120.0, 372.5], [121.0, 283.95454545454544], [122.0, 491.00000000000006], [123.0, 472.18181818181824], [124.0, 389.375], [125.0, 382.375], [126.0, 430.5199999999999], [127.0, 481.037037037037], [128.0, 327.99999999999994], [129.0, 373.2666666666667], [130.0, 502.3809523809523], [131.0, 393.50000000000006], [132.0, 381.32142857142856], [133.0, 510.875], [134.0, 427.0], [135.0, 481.57894736842104], [136.0, 470.24999999999994], [137.0, 418.05], [138.0, 375.6000000000001], [139.0, 346.00000000000006], [140.0, 410.7692307692307], [141.0, 397.70000000000005], [142.0, 418.88888888888886], [143.0, 354.0], [144.0, 380.8], [145.0, 372.38461538461536], [146.0, 376.5416666666668], [147.0, 391.21311475409834], [148.0, 419.3220338983051], [149.0, 463.84946236559125], [150.0, 401.86486486486484], [151.0, 485.63043478260875], [152.0, 395.26086956521743], [153.0, 403.8333333333333], [154.0, 510.3934426229509], [155.0, 415.2058823529412], [156.0, 467.4], [157.0, 461.94392523364473], [158.0, 388.5090909090909], [159.0, 391.8064516129033], [160.0, 434.8157894736842], [161.0, 460.0], [162.0, 452.843373493976], [163.0, 519.4418604651162], [164.0, 435.2277227722771], [165.0, 379.9], [166.0, 507.06976744186045], [167.0, 554.9846153846154], [168.0, 472.55], [169.0, 523.3125000000001], [170.0, 436.09090909090907], [171.0, 351.7142857142857], [172.0, 479.13793103448273], [173.0, 535.5538461538463], [174.0, 463.91428571428565], [175.0, 421.83333333333337], [176.0, 470.4571428571428], [177.0, 441.44444444444446], [178.0, 458.5142857142856], [179.0, 464.5454545454548], [180.0, 480.17857142857144], [181.0, 456.19101123595493], [182.0, 443.6228070175439], [183.0, 480.16666666666663], [184.0, 170.0], [1.0, 16.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}, {"data": [[126.78025000000007, 364.07774999999975]], "isOverall": false, "label": "GET /api/posts/feed-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 184.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 29800.0, "minX": 1.78166358E12, "maxY": 137600.0, "series": [{"data": [[1.78166358E12, 137600.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78166358E12, 29800.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166358E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 364.07774999999975, "minX": 1.78166358E12, "maxY": 364.07774999999975, "series": [{"data": [[1.78166358E12, 364.07774999999975]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166358E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 363.65975000000117, "minX": 1.78166358E12, "maxY": 363.65975000000117, "series": [{"data": [[1.78166358E12, 363.65975000000117]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166358E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.10300000000000001, "minX": 1.78166358E12, "maxY": 0.10300000000000001, "series": [{"data": [[1.78166358E12, 0.10300000000000001]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166358E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 10.0, "minX": 1.78166358E12, "maxY": 1737.0, "series": [{"data": [[1.78166358E12, 1737.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78166358E12, 707.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78166358E12, 1146.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78166358E12, 890.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.78166358E12, 10.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78166358E12, 280.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166358E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 46.5, "minX": 46.0, "maxY": 475.0, "series": [{"data": [[46.0, 46.5], [239.0, 114.0], [235.0, 121.0], [297.0, 467.0], [318.0, 206.0], [337.0, 280.0], [342.0, 432.5], [353.0, 364.0], [354.0, 475.0], [355.0, 456.0], [369.0, 438.0], [370.0, 467.5], [385.0, 272.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 385.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 46.5, "minX": 46.0, "maxY": 474.5, "series": [{"data": [[46.0, 46.5], [239.0, 114.0], [235.0, 121.0], [297.0, 467.0], [318.0, 206.0], [337.0, 280.0], [342.0, 432.0], [353.0, 363.0], [354.0, 474.5], [355.0, 455.0], [369.0, 438.0], [370.0, 466.5], [385.0, 272.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 385.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 66.66666666666667, "minX": 1.78166358E12, "maxY": 66.66666666666667, "series": [{"data": [[1.78166358E12, 66.66666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166358E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 66.66666666666667, "minX": 1.78166358E12, "maxY": 66.66666666666667, "series": [{"data": [[1.78166358E12, 66.66666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166358E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 66.66666666666667, "minX": 1.78166358E12, "maxY": 66.66666666666667, "series": [{"data": [[1.78166358E12, 66.66666666666667]], "isOverall": false, "label": "GET /api/posts/feed-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166358E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 66.66666666666667, "minX": 1.78166358E12, "maxY": 66.66666666666667, "series": [{"data": [[1.78166358E12, 66.66666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166358E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

