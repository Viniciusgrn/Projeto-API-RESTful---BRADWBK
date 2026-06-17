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
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 4985.0, "series": [{"data": [[0.0, 10.0], [0.1, 16.0], [0.2, 17.0], [0.3, 18.0], [0.4, 19.0], [0.5, 19.0], [0.6, 20.0], [0.7, 21.0], [0.8, 22.0], [0.9, 22.0], [1.0, 23.0], [1.1, 23.0], [1.2, 24.0], [1.3, 25.0], [1.4, 25.0], [1.5, 26.0], [1.6, 26.0], [1.7, 26.0], [1.8, 27.0], [1.9, 27.0], [2.0, 28.0], [2.1, 28.0], [2.2, 28.0], [2.3, 28.0], [2.4, 29.0], [2.5, 29.0], [2.6, 29.0], [2.7, 29.0], [2.8, 30.0], [2.9, 30.0], [3.0, 30.0], [3.1, 30.0], [3.2, 30.0], [3.3, 30.0], [3.4, 31.0], [3.5, 31.0], [3.6, 31.0], [3.7, 31.0], [3.8, 31.0], [3.9, 31.0], [4.0, 32.0], [4.1, 32.0], [4.2, 32.0], [4.3, 32.0], [4.4, 32.0], [4.5, 32.0], [4.6, 32.0], [4.7, 32.0], [4.8, 32.0], [4.9, 33.0], [5.0, 33.0], [5.1, 33.0], [5.2, 33.0], [5.3, 33.0], [5.4, 33.0], [5.5, 33.0], [5.6, 33.0], [5.7, 34.0], [5.8, 34.0], [5.9, 34.0], [6.0, 34.0], [6.1, 34.0], [6.2, 34.0], [6.3, 34.0], [6.4, 34.0], [6.5, 34.0], [6.6, 35.0], [6.7, 35.0], [6.8, 35.0], [6.9, 35.0], [7.0, 35.0], [7.1, 35.0], [7.2, 35.0], [7.3, 35.0], [7.4, 35.0], [7.5, 35.0], [7.6, 36.0], [7.7, 36.0], [7.8, 36.0], [7.9, 36.0], [8.0, 36.0], [8.1, 36.0], [8.2, 36.0], [8.3, 36.0], [8.4, 36.0], [8.5, 36.0], [8.6, 37.0], [8.7, 37.0], [8.8, 37.0], [8.9, 37.0], [9.0, 37.0], [9.1, 37.0], [9.2, 37.0], [9.3, 37.0], [9.4, 38.0], [9.5, 38.0], [9.6, 38.0], [9.7, 38.0], [9.8, 38.0], [9.9, 38.0], [10.0, 38.0], [10.1, 38.0], [10.2, 38.0], [10.3, 38.0], [10.4, 38.0], [10.5, 39.0], [10.6, 39.0], [10.7, 39.0], [10.8, 39.0], [10.9, 39.0], [11.0, 39.0], [11.1, 39.0], [11.2, 39.0], [11.3, 39.0], [11.4, 40.0], [11.5, 40.0], [11.6, 40.0], [11.7, 40.0], [11.8, 40.0], [11.9, 40.0], [12.0, 40.0], [12.1, 40.0], [12.2, 40.0], [12.3, 40.0], [12.4, 40.0], [12.5, 40.0], [12.6, 41.0], [12.7, 41.0], [12.8, 41.0], [12.9, 41.0], [13.0, 41.0], [13.1, 41.0], [13.2, 41.0], [13.3, 41.0], [13.4, 41.0], [13.5, 41.0], [13.6, 41.0], [13.7, 41.0], [13.8, 42.0], [13.9, 42.0], [14.0, 42.0], [14.1, 42.0], [14.2, 42.0], [14.3, 42.0], [14.4, 42.0], [14.5, 42.0], [14.6, 42.0], [14.7, 42.0], [14.8, 42.0], [14.9, 42.0], [15.0, 43.0], [15.1, 43.0], [15.2, 43.0], [15.3, 43.0], [15.4, 43.0], [15.5, 43.0], [15.6, 43.0], [15.7, 43.0], [15.8, 43.0], [15.9, 43.0], [16.0, 43.0], [16.1, 44.0], [16.2, 44.0], [16.3, 44.0], [16.4, 44.0], [16.5, 44.0], [16.6, 44.0], [16.7, 44.0], [16.8, 44.0], [16.9, 44.0], [17.0, 44.0], [17.1, 44.0], [17.2, 44.0], [17.3, 44.0], [17.4, 45.0], [17.5, 45.0], [17.6, 45.0], [17.7, 45.0], [17.8, 45.0], [17.9, 45.0], [18.0, 45.0], [18.1, 45.0], [18.2, 45.0], [18.3, 45.0], [18.4, 46.0], [18.5, 46.0], [18.6, 46.0], [18.7, 46.0], [18.8, 46.0], [18.9, 46.0], [19.0, 46.0], [19.1, 46.0], [19.2, 46.0], [19.3, 46.0], [19.4, 46.0], [19.5, 46.0], [19.6, 46.0], [19.7, 46.0], [19.8, 46.0], [19.9, 46.0], [20.0, 46.0], [20.1, 47.0], [20.2, 47.0], [20.3, 47.0], [20.4, 47.0], [20.5, 47.0], [20.6, 47.0], [20.7, 47.0], [20.8, 47.0], [20.9, 47.0], [21.0, 47.0], [21.1, 47.0], [21.2, 47.0], [21.3, 48.0], [21.4, 48.0], [21.5, 48.0], [21.6, 48.0], [21.7, 48.0], [21.8, 48.0], [21.9, 48.0], [22.0, 48.0], [22.1, 48.0], [22.2, 48.0], [22.3, 48.0], [22.4, 48.0], [22.5, 48.0], [22.6, 49.0], [22.7, 49.0], [22.8, 49.0], [22.9, 49.0], [23.0, 49.0], [23.1, 49.0], [23.2, 49.0], [23.3, 49.0], [23.4, 49.0], [23.5, 49.0], [23.6, 49.0], [23.7, 49.0], [23.8, 50.0], [23.9, 50.0], [24.0, 50.0], [24.1, 50.0], [24.2, 50.0], [24.3, 50.0], [24.4, 50.0], [24.5, 50.0], [24.6, 50.0], [24.7, 50.0], [24.8, 50.0], [24.9, 50.0], [25.0, 50.0], [25.1, 50.0], [25.2, 51.0], [25.3, 51.0], [25.4, 51.0], [25.5, 51.0], [25.6, 51.0], [25.7, 51.0], [25.8, 51.0], [25.9, 51.0], [26.0, 51.0], [26.1, 51.0], [26.2, 51.0], [26.3, 51.0], [26.4, 52.0], [26.5, 52.0], [26.6, 52.0], [26.7, 52.0], [26.8, 52.0], [26.9, 52.0], [27.0, 52.0], [27.1, 52.0], [27.2, 52.0], [27.3, 52.0], [27.4, 52.0], [27.5, 52.0], [27.6, 53.0], [27.7, 53.0], [27.8, 53.0], [27.9, 53.0], [28.0, 53.0], [28.1, 53.0], [28.2, 53.0], [28.3, 53.0], [28.4, 53.0], [28.5, 53.0], [28.6, 53.0], [28.7, 54.0], [28.8, 54.0], [28.9, 54.0], [29.0, 54.0], [29.1, 54.0], [29.2, 54.0], [29.3, 54.0], [29.4, 54.0], [29.5, 54.0], [29.6, 54.0], [29.7, 54.0], [29.8, 54.0], [29.9, 54.0], [30.0, 54.0], [30.1, 55.0], [30.2, 55.0], [30.3, 55.0], [30.4, 55.0], [30.5, 55.0], [30.6, 55.0], [30.7, 55.0], [30.8, 55.0], [30.9, 55.0], [31.0, 55.0], [31.1, 56.0], [31.2, 56.0], [31.3, 56.0], [31.4, 56.0], [31.5, 56.0], [31.6, 56.0], [31.7, 56.0], [31.8, 56.0], [31.9, 56.0], [32.0, 56.0], [32.1, 57.0], [32.2, 57.0], [32.3, 57.0], [32.4, 57.0], [32.5, 57.0], [32.6, 57.0], [32.7, 57.0], [32.8, 57.0], [32.9, 57.0], [33.0, 57.0], [33.1, 58.0], [33.2, 58.0], [33.3, 58.0], [33.4, 58.0], [33.5, 58.0], [33.6, 58.0], [33.7, 58.0], [33.8, 59.0], [33.9, 59.0], [34.0, 59.0], [34.1, 59.0], [34.2, 59.0], [34.3, 59.0], [34.4, 59.0], [34.5, 59.0], [34.6, 59.0], [34.7, 59.0], [34.8, 60.0], [34.9, 60.0], [35.0, 60.0], [35.1, 60.0], [35.2, 60.0], [35.3, 60.0], [35.4, 60.0], [35.5, 61.0], [35.6, 61.0], [35.7, 61.0], [35.8, 61.0], [35.9, 61.0], [36.0, 61.0], [36.1, 61.0], [36.2, 61.0], [36.3, 61.0], [36.4, 62.0], [36.5, 62.0], [36.6, 62.0], [36.7, 62.0], [36.8, 62.0], [36.9, 62.0], [37.0, 62.0], [37.1, 62.0], [37.2, 62.0], [37.3, 63.0], [37.4, 63.0], [37.5, 63.0], [37.6, 63.0], [37.7, 63.0], [37.8, 63.0], [37.9, 63.0], [38.0, 64.0], [38.1, 64.0], [38.2, 64.0], [38.3, 64.0], [38.4, 64.0], [38.5, 64.0], [38.6, 64.0], [38.7, 65.0], [38.8, 65.0], [38.9, 65.0], [39.0, 65.0], [39.1, 65.0], [39.2, 66.0], [39.3, 66.0], [39.4, 66.0], [39.5, 66.0], [39.6, 66.0], [39.7, 67.0], [39.8, 67.0], [39.9, 67.0], [40.0, 67.0], [40.1, 67.0], [40.2, 68.0], [40.3, 68.0], [40.4, 68.0], [40.5, 68.0], [40.6, 68.0], [40.7, 68.0], [40.8, 68.0], [40.9, 68.0], [41.0, 69.0], [41.1, 69.0], [41.2, 69.0], [41.3, 69.0], [41.4, 69.0], [41.5, 70.0], [41.6, 70.0], [41.7, 70.0], [41.8, 70.0], [41.9, 71.0], [42.0, 71.0], [42.1, 71.0], [42.2, 71.0], [42.3, 72.0], [42.4, 72.0], [42.5, 72.0], [42.6, 72.0], [42.7, 73.0], [42.8, 73.0], [42.9, 74.0], [43.0, 74.0], [43.1, 75.0], [43.2, 76.0], [43.3, 76.0], [43.4, 76.0], [43.5, 77.0], [43.6, 77.0], [43.7, 78.0], [43.8, 78.0], [43.9, 78.0], [44.0, 78.0], [44.1, 79.0], [44.2, 79.0], [44.3, 79.0], [44.4, 80.0], [44.5, 81.0], [44.6, 81.0], [44.7, 82.0], [44.8, 83.0], [44.9, 83.0], [45.0, 84.0], [45.1, 85.0], [45.2, 85.0], [45.3, 86.0], [45.4, 87.0], [45.5, 87.0], [45.6, 88.0], [45.7, 88.0], [45.8, 89.0], [45.9, 89.0], [46.0, 89.0], [46.1, 90.0], [46.2, 90.0], [46.3, 90.0], [46.4, 91.0], [46.5, 92.0], [46.6, 93.0], [46.7, 93.0], [46.8, 94.0], [46.9, 94.0], [47.0, 95.0], [47.1, 96.0], [47.2, 96.0], [47.3, 97.0], [47.4, 97.0], [47.5, 98.0], [47.6, 98.0], [47.7, 98.0], [47.8, 99.0], [47.9, 99.0], [48.0, 100.0], [48.1, 100.0], [48.2, 101.0], [48.3, 102.0], [48.4, 102.0], [48.5, 102.0], [48.6, 103.0], [48.7, 103.0], [48.8, 104.0], [48.9, 105.0], [49.0, 106.0], [49.1, 106.0], [49.2, 107.0], [49.3, 108.0], [49.4, 109.0], [49.5, 110.0], [49.6, 111.0], [49.7, 112.0], [49.8, 112.0], [49.9, 113.0], [50.0, 114.0], [50.1, 115.0], [50.2, 116.0], [50.3, 116.0], [50.4, 118.0], [50.5, 120.0], [50.6, 121.0], [50.7, 123.0], [50.8, 124.0], [50.9, 125.0], [51.0, 125.0], [51.1, 126.0], [51.2, 127.0], [51.3, 128.0], [51.4, 132.0], [51.5, 134.0], [51.6, 137.0], [51.7, 140.0], [51.8, 147.0], [51.9, 149.0], [52.0, 151.0], [52.1, 152.0], [52.2, 155.0], [52.3, 158.0], [52.4, 158.0], [52.5, 159.0], [52.6, 161.0], [52.7, 167.0], [52.8, 171.0], [52.9, 177.0], [53.0, 179.0], [53.1, 183.0], [53.2, 187.0], [53.3, 192.0], [53.4, 196.0], [53.5, 203.0], [53.6, 205.0], [53.7, 209.0], [53.8, 211.0], [53.9, 214.0], [54.0, 218.0], [54.1, 219.0], [54.2, 223.0], [54.3, 228.0], [54.4, 233.0], [54.5, 235.0], [54.6, 240.0], [54.7, 246.0], [54.8, 249.0], [54.9, 253.0], [55.0, 255.0], [55.1, 259.0], [55.2, 262.0], [55.3, 266.0], [55.4, 269.0], [55.5, 271.0], [55.6, 275.0], [55.7, 280.0], [55.8, 287.0], [55.9, 293.0], [56.0, 296.0], [56.1, 302.0], [56.2, 308.0], [56.3, 315.0], [56.4, 323.0], [56.5, 324.0], [56.6, 334.0], [56.7, 342.0], [56.8, 346.0], [56.9, 356.0], [57.0, 362.0], [57.1, 363.0], [57.2, 370.0], [57.3, 376.0], [57.4, 388.0], [57.5, 392.0], [57.6, 396.0], [57.7, 405.0], [57.8, 413.0], [57.9, 415.0], [58.0, 417.0], [58.1, 419.0], [58.2, 420.0], [58.3, 422.0], [58.4, 425.0], [58.5, 431.0], [58.6, 431.0], [58.7, 437.0], [58.8, 439.0], [58.9, 442.0], [59.0, 449.0], [59.1, 454.0], [59.2, 455.0], [59.3, 458.0], [59.4, 460.0], [59.5, 465.0], [59.6, 468.0], [59.7, 470.0], [59.8, 476.0], [59.9, 477.0], [60.0, 483.0], [60.1, 486.0], [60.2, 490.0], [60.3, 496.0], [60.4, 497.0], [60.5, 499.0], [60.6, 504.0], [60.7, 508.0], [60.8, 512.0], [60.9, 513.0], [61.0, 521.0], [61.1, 527.0], [61.2, 532.0], [61.3, 538.0], [61.4, 547.0], [61.5, 554.0], [61.6, 561.0], [61.7, 570.0], [61.8, 573.0], [61.9, 582.0], [62.0, 589.0], [62.1, 590.0], [62.2, 593.0], [62.3, 598.0], [62.4, 601.0], [62.5, 603.0], [62.6, 604.0], [62.7, 607.0], [62.8, 610.0], [62.9, 612.0], [63.0, 614.0], [63.1, 619.0], [63.2, 619.0], [63.3, 624.0], [63.4, 627.0], [63.5, 630.0], [63.6, 630.0], [63.7, 632.0], [63.8, 636.0], [63.9, 638.0], [64.0, 640.0], [64.1, 641.0], [64.2, 643.0], [64.3, 646.0], [64.4, 648.0], [64.5, 651.0], [64.6, 656.0], [64.7, 661.0], [64.8, 663.0], [64.9, 670.0], [65.0, 673.0], [65.1, 674.0], [65.2, 680.0], [65.3, 684.0], [65.4, 688.0], [65.5, 689.0], [65.6, 694.0], [65.7, 699.0], [65.8, 701.0], [65.9, 706.0], [66.0, 709.0], [66.1, 711.0], [66.2, 714.0], [66.3, 715.0], [66.4, 718.0], [66.5, 722.0], [66.6, 724.0], [66.7, 726.0], [66.8, 727.0], [66.9, 729.0], [67.0, 730.0], [67.1, 732.0], [67.2, 736.0], [67.3, 738.0], [67.4, 740.0], [67.5, 741.0], [67.6, 742.0], [67.7, 743.0], [67.8, 745.0], [67.9, 747.0], [68.0, 749.0], [68.1, 752.0], [68.2, 753.0], [68.3, 754.0], [68.4, 755.0], [68.5, 756.0], [68.6, 758.0], [68.7, 761.0], [68.8, 761.0], [68.9, 764.0], [69.0, 765.0], [69.1, 768.0], [69.2, 772.0], [69.3, 774.0], [69.4, 776.0], [69.5, 778.0], [69.6, 779.0], [69.7, 782.0], [69.8, 783.0], [69.9, 784.0], [70.0, 785.0], [70.1, 787.0], [70.2, 789.0], [70.3, 789.0], [70.4, 792.0], [70.5, 792.0], [70.6, 800.0], [70.7, 802.0], [70.8, 803.0], [70.9, 804.0], [71.0, 807.0], [71.1, 809.0], [71.2, 810.0], [71.3, 812.0], [71.4, 814.0], [71.5, 816.0], [71.6, 818.0], [71.7, 824.0], [71.8, 827.0], [71.9, 829.0], [72.0, 834.0], [72.1, 835.0], [72.2, 837.0], [72.3, 839.0], [72.4, 842.0], [72.5, 844.0], [72.6, 847.0], [72.7, 850.0], [72.8, 858.0], [72.9, 866.0], [73.0, 867.0], [73.1, 870.0], [73.2, 874.0], [73.3, 879.0], [73.4, 881.0], [73.5, 887.0], [73.6, 892.0], [73.7, 895.0], [73.8, 897.0], [73.9, 898.0], [74.0, 902.0], [74.1, 906.0], [74.2, 910.0], [74.3, 911.0], [74.4, 917.0], [74.5, 922.0], [74.6, 925.0], [74.7, 936.0], [74.8, 938.0], [74.9, 944.0], [75.0, 952.0], [75.1, 959.0], [75.2, 964.0], [75.3, 969.0], [75.4, 973.0], [75.5, 982.0], [75.6, 993.0], [75.7, 1001.0], [75.8, 1021.0], [75.9, 1025.0], [76.0, 1039.0], [76.1, 1053.0], [76.2, 1059.0], [76.3, 1073.0], [76.4, 1080.0], [76.5, 1086.0], [76.6, 1090.0], [76.7, 1094.0], [76.8, 1106.0], [76.9, 1117.0], [77.0, 1125.0], [77.1, 1133.0], [77.2, 1140.0], [77.3, 1145.0], [77.4, 1148.0], [77.5, 1158.0], [77.6, 1163.0], [77.7, 1164.0], [77.8, 1166.0], [77.9, 1169.0], [78.0, 1171.0], [78.1, 1172.0], [78.2, 1174.0], [78.3, 1174.0], [78.4, 1177.0], [78.5, 1180.0], [78.6, 1181.0], [78.7, 1182.0], [78.8, 1186.0], [78.9, 1188.0], [79.0, 1191.0], [79.1, 1193.0], [79.2, 1198.0], [79.3, 1202.0], [79.4, 1203.0], [79.5, 1207.0], [79.6, 1211.0], [79.7, 1216.0], [79.8, 1223.0], [79.9, 1228.0], [80.0, 1231.0], [80.1, 1235.0], [80.2, 1239.0], [80.3, 1242.0], [80.4, 1251.0], [80.5, 1256.0], [80.6, 1268.0], [80.7, 1275.0], [80.8, 1280.0], [80.9, 1284.0], [81.0, 1293.0], [81.1, 1302.0], [81.2, 1310.0], [81.3, 1317.0], [81.4, 1322.0], [81.5, 1327.0], [81.6, 1331.0], [81.7, 1333.0], [81.8, 1338.0], [81.9, 1342.0], [82.0, 1347.0], [82.1, 1348.0], [82.2, 1353.0], [82.3, 1356.0], [82.4, 1359.0], [82.5, 1362.0], [82.6, 1364.0], [82.7, 1365.0], [82.8, 1370.0], [82.9, 1372.0], [83.0, 1379.0], [83.1, 1381.0], [83.2, 1385.0], [83.3, 1389.0], [83.4, 1391.0], [83.5, 1394.0], [83.6, 1398.0], [83.7, 1403.0], [83.8, 1408.0], [83.9, 1412.0], [84.0, 1417.0], [84.1, 1419.0], [84.2, 1421.0], [84.3, 1422.0], [84.4, 1424.0], [84.5, 1425.0], [84.6, 1426.0], [84.7, 1428.0], [84.8, 1431.0], [84.9, 1433.0], [85.0, 1436.0], [85.1, 1437.0], [85.2, 1438.0], [85.3, 1441.0], [85.4, 1442.0], [85.5, 1443.0], [85.6, 1446.0], [85.7, 1447.0], [85.8, 1450.0], [85.9, 1452.0], [86.0, 1454.0], [86.1, 1457.0], [86.2, 1458.0], [86.3, 1465.0], [86.4, 1468.0], [86.5, 1472.0], [86.6, 1472.0], [86.7, 1477.0], [86.8, 1479.0], [86.9, 1484.0], [87.0, 1485.0], [87.1, 1489.0], [87.2, 1501.0], [87.3, 1504.0], [87.4, 1511.0], [87.5, 1514.0], [87.6, 1522.0], [87.7, 1526.0], [87.8, 1534.0], [87.9, 1538.0], [88.0, 1552.0], [88.1, 1555.0], [88.2, 1557.0], [88.3, 1565.0], [88.4, 1568.0], [88.5, 1578.0], [88.6, 1583.0], [88.7, 1588.0], [88.8, 1594.0], [88.9, 1600.0], [89.0, 1607.0], [89.1, 1614.0], [89.2, 1620.0], [89.3, 1630.0], [89.4, 1635.0], [89.5, 1641.0], [89.6, 1642.0], [89.7, 1650.0], [89.8, 1668.0], [89.9, 1678.0], [90.0, 1689.0], [90.1, 1697.0], [90.2, 1699.0], [90.3, 1705.0], [90.4, 1711.0], [90.5, 1713.0], [90.6, 1716.0], [90.7, 1721.0], [90.8, 1728.0], [90.9, 1736.0], [91.0, 1742.0], [91.1, 1756.0], [91.2, 1767.0], [91.3, 1772.0], [91.4, 1783.0], [91.5, 1806.0], [91.6, 1838.0], [91.7, 1858.0], [91.8, 1877.0], [91.9, 1882.0], [92.0, 1903.0], [92.1, 1911.0], [92.2, 1917.0], [92.3, 1932.0], [92.4, 1950.0], [92.5, 1964.0], [92.6, 1998.0], [92.7, 2007.0], [92.8, 2021.0], [92.9, 2034.0], [93.0, 2040.0], [93.1, 2049.0], [93.2, 2053.0], [93.3, 2059.0], [93.4, 2064.0], [93.5, 2067.0], [93.6, 2073.0], [93.7, 2079.0], [93.8, 2081.0], [93.9, 2082.0], [94.0, 2091.0], [94.1, 2098.0], [94.2, 2105.0], [94.3, 2112.0], [94.4, 2121.0], [94.5, 2128.0], [94.6, 2133.0], [94.7, 2140.0], [94.8, 2148.0], [94.9, 2157.0], [95.0, 2161.0], [95.1, 2182.0], [95.2, 2201.0], [95.3, 2230.0], [95.4, 2237.0], [95.5, 2242.0], [95.6, 2251.0], [95.7, 2254.0], [95.8, 2262.0], [95.9, 2268.0], [96.0, 2287.0], [96.1, 2303.0], [96.2, 2325.0], [96.3, 2342.0], [96.4, 2360.0], [96.5, 2369.0], [96.6, 2381.0], [96.7, 2406.0], [96.8, 2417.0], [96.9, 2430.0], [97.0, 2479.0], [97.1, 2497.0], [97.2, 2587.0], [97.3, 2627.0], [97.4, 2687.0], [97.5, 2714.0], [97.6, 2726.0], [97.7, 2731.0], [97.8, 2753.0], [97.9, 2763.0], [98.0, 2798.0], [98.1, 2811.0], [98.2, 2846.0], [98.3, 2876.0], [98.4, 2892.0], [98.5, 2907.0], [98.6, 2924.0], [98.7, 2953.0], [98.8, 3008.0], [98.9, 3042.0], [99.0, 3047.0], [99.1, 3108.0], [99.2, 3240.0], [99.3, 3278.0], [99.4, 3431.0], [99.5, 3463.0], [99.6, 3618.0], [99.7, 3678.0], [99.8, 3917.0], [99.9, 4106.0], [100.0, 4985.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1919.0, "series": [{"data": [[0.0, 1919.0], [600.0, 134.0], [700.0, 195.0], [800.0, 133.0], [900.0, 69.0], [1000.0, 44.0], [1100.0, 99.0], [1200.0, 72.0], [1300.0, 105.0], [1400.0, 140.0], [1500.0, 69.0], [100.0, 219.0], [1600.0, 53.0], [1700.0, 51.0], [1800.0, 20.0], [1900.0, 25.0], [2000.0, 62.0], [2100.0, 40.0], [2300.0, 25.0], [2200.0, 36.0], [2400.0, 17.0], [2500.0, 5.0], [2600.0, 8.0], [2700.0, 24.0], [2800.0, 15.0], [2900.0, 15.0], [3000.0, 12.0], [3100.0, 4.0], [200.0, 104.0], [3200.0, 5.0], [3300.0, 2.0], [3400.0, 6.0], [3500.0, 1.0], [3600.0, 7.0], [3700.0, 2.0], [3800.0, 1.0], [3900.0, 2.0], [4000.0, 2.0], [4100.0, 2.0], [4400.0, 1.0], [300.0, 63.0], [4900.0, 2.0], [400.0, 116.0], [500.0, 74.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 513.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 2423.0, "series": [{"data": [[0.0, 2423.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1064.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 513.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 111.06501547987612, "minX": 1.78166358E12, "maxY": 166.01735598227455, "series": [{"data": [[1.78166364E12, 111.06501547987612], [1.78166358E12, 166.01735598227455]], "isOverall": false, "label": "Feed - 50 usuarios", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166364E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 17.0, "minX": 1.0, "maxY": 964.3333333333334, "series": [{"data": [[2.0, 18.333333333333332], [3.0, 31.0], [4.0, 26.0], [5.0, 24.0], [6.0, 25.2], [7.0, 33.0], [8.0, 32.0], [9.0, 45.285714285714285], [10.0, 38.25], [11.0, 27.75], [12.0, 76.19999999999999], [13.0, 109.0], [14.0, 108.5], [16.0, 92.5], [17.0, 278.0], [18.0, 23.5], [19.0, 149.8], [20.0, 192.57142857142858], [21.0, 32.0], [22.0, 312.3333333333333], [23.0, 27.0], [24.0, 223.0], [25.0, 211.0], [26.0, 317.6666666666667], [27.0, 257.0], [28.0, 354.91666666666663], [29.0, 382.5384615384615], [30.0, 137.5], [31.0, 242.83333333333334], [32.0, 75.0], [33.0, 132.33333333333331], [34.0, 85.5], [35.0, 207.1818181818182], [36.0, 130.0], [37.0, 76.28571428571429], [38.0, 259.3333333333333], [39.0, 193.57894736842107], [40.0, 131.33333333333334], [41.0, 180.81818181818184], [42.0, 101.5], [43.0, 148.11111111111111], [44.0, 216.125], [45.0, 162.44444444444446], [46.0, 345.25], [47.0, 141.375], [48.0, 380.2857142857143], [49.0, 169.46153846153845], [50.0, 185.0], [51.0, 354.41666666666663], [52.0, 284.5], [53.0, 239.11111111111114], [54.0, 199.77777777777777], [55.0, 271.50000000000006], [56.0, 185.66666666666669], [57.0, 132.25], [58.0, 284.5454545454545], [59.0, 416.75], [60.0, 443.8], [61.0, 400.28], [62.0, 213.16666666666666], [63.0, 247.75], [64.0, 365.1428571428571], [65.0, 177.42857142857142], [66.0, 452.6], [67.0, 174.0909090909091], [68.0, 120.0], [69.0, 295.38461538461536], [70.0, 480.6666666666667], [71.0, 196.36363636363637], [72.0, 400.2], [73.0, 414.09999999999997], [74.0, 455.6363636363636], [75.0, 239.92307692307693], [77.0, 266.0], [78.0, 212.24999999999997], [79.0, 433.6874999999999], [76.0, 431.33333333333337], [80.0, 286.44444444444446], [81.0, 103.33333333333331], [82.0, 333.0], [83.0, 623.25], [84.0, 379.3], [85.0, 351.7692307692308], [87.0, 343.68421052631584], [86.0, 342.5], [88.0, 443.2222222222222], [89.0, 646.65], [90.0, 138.2], [91.0, 500.25], [92.0, 498.75000000000006], [93.0, 420.7931034482758], [94.0, 143.66666666666663], [95.0, 251.0], [96.0, 557.3125], [97.0, 403.0], [99.0, 376.5], [98.0, 834.0], [100.0, 327.15000000000003], [101.0, 484.0], [102.0, 519.8333333333333], [103.0, 349.59999999999997], [104.0, 537.0], [105.0, 214.33333333333331], [106.0, 448.2], [107.0, 420.1666666666667], [108.0, 614.1666666666667], [109.0, 168.7142857142857], [110.0, 379.0], [111.0, 586.0333333333334], [112.0, 294.92857142857144], [113.0, 574.608695652174], [114.0, 270.62499999999994], [115.0, 322.3125], [116.0, 492.75], [117.0, 338.8181818181818], [118.0, 491.0], [119.0, 403.73333333333335], [120.0, 547.909090909091], [121.0, 843.0], [122.0, 612.1764705882352], [123.0, 589.1666666666666], [124.0, 259.6], [125.0, 426.56250000000006], [126.0, 530.8260869565217], [127.0, 635.7058823529413], [128.0, 529.7272727272727], [129.0, 296.13333333333327], [130.0, 549.0], [131.0, 526.0], [132.0, 541.3333333333333], [133.0, 687.4545454545455], [134.0, 341.75], [135.0, 579.5769230769231], [136.0, 488.8], [137.0, 349.5454545454545], [138.0, 497.8125000000001], [140.0, 408.4], [141.0, 390.5], [142.0, 577.8], [143.0, 700.2972972972973], [139.0, 594.0930232558142], [144.0, 719.7692307692307], [145.0, 621.390243902439], [146.0, 964.3333333333334], [147.0, 654.7692307692307], [148.0, 521.2222222222222], [149.0, 685.1666666666666], [150.0, 484.3076923076924], [151.0, 483.05555555555554], [152.0, 742.8095238095239], [153.0, 790.1724137931035], [154.0, 705.1034482758622], [155.0, 447.4285714285714], [156.0, 810.6], [157.0, 635.4285714285716], [158.0, 541.0476190476192], [159.0, 805.3846153846154], [160.0, 383.33333333333337], [161.0, 533.1428571428572], [162.0, 733.3863636363636], [163.0, 700.5999999999999], [164.0, 440.27272727272725], [165.0, 658.5172413793105], [166.0, 663.7647058823529], [167.0, 734.4912280701755], [168.0, 757.2777777777777], [169.0, 693.6136363636365], [170.0, 720.1176470588238], [171.0, 615.1666666666666], [172.0, 519.2105263157895], [173.0, 596.0], [174.0, 786.909090909091], [175.0, 574.5833333333333], [176.0, 713.6176470588234], [177.0, 295.6666666666667], [178.0, 669.8750000000002], [179.0, 670.8133333333334], [180.0, 722.9722222222224], [181.0, 466.0714285714286], [182.0, 747.3617021276594], [183.0, 692.3846153846155], [184.0, 808.625], [185.0, 814.4769230769231], [186.0, 356.77777777777777], [187.0, 496.5], [188.0, 936.5151515151515], [189.0, 766.7864077669904], [190.0, 758.9393939393939], [191.0, 657.5], [192.0, 728.4583333333331], [193.0, 943.6976744186047], [194.0, 852.4642857142858], [195.0, 716.84], [196.0, 677.8378378378379], [197.0, 783.5588235294116], [198.0, 762.8500000000001], [199.0, 812.968292682927], [200.0, 617.0619047619049], [1.0, 17.0]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}, {"data": [[148.26774999999978, 598.8195000000007]], "isOverall": false, "label": "GET /api/posts/feed-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 9754.6, "minX": 1.78166358E12, "maxY": 94734.86666666667, "series": [{"data": [[1.78166364E12, 45198.46666666667], [1.78166358E12, 94734.86666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78166364E12, 9754.6], [1.78166358E12, 20445.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166364E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 520.1145510835914, "minX": 1.78166358E12, "maxY": 636.3700147710498, "series": [{"data": [[1.78166364E12, 520.1145510835914], [1.78166358E12, 636.3700147710498]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166364E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 520.0688854489167, "minX": 1.78166358E12, "maxY": 636.0432053175776, "series": [{"data": [[1.78166364E12, 520.0688854489167], [1.78166358E12, 636.0432053175776]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166364E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.78166358E12, "maxY": 10.065361890694252, "series": [{"data": [[1.78166364E12, 0.0], [1.78166358E12, 10.065361890694252]], "isOverall": false, "label": "GET /api/posts/feed", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166364E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.78166358E12, "maxY": 4985.0, "series": [{"data": [[1.78166364E12, 3653.0], [1.78166358E12, 4985.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78166364E12, 1384.4], [1.78166358E12, 1932.1999999999998]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78166364E12, 2470.0699999999997], [1.78166358E12, 3268.91]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78166364E12, 1749.35], [1.78166358E12, 2302.0999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.78166364E12, 10.0], [1.78166358E12, 16.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78166364E12, 161.5], [1.78166358E12, 111.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166364E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 69.0, "minX": 94.0, "maxY": 539.5, "series": [{"data": [[191.0, 134.0], [188.0, 151.0], [205.0, 140.0], [216.0, 122.0], [242.0, 85.5], [241.0, 93.0], [254.0, 69.0], [255.0, 87.0], [258.0, 72.5], [264.0, 77.5], [265.0, 539.5], [261.0, 454.0], [270.0, 360.0], [277.0, 75.0], [94.0, 108.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 277.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 69.0, "minX": 94.0, "maxY": 539.5, "series": [{"data": [[191.0, 134.0], [188.0, 151.0], [205.0, 140.0], [216.0, 122.0], [242.0, 85.5], [241.0, 93.0], [254.0, 69.0], [255.0, 87.0], [258.0, 72.5], [264.0, 77.5], [265.0, 539.5], [261.0, 454.0], [270.0, 360.0], [277.0, 75.0], [94.0, 108.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 277.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 18.75, "minX": 1.78166358E12, "maxY": 47.916666666666664, "series": [{"data": [[1.78166364E12, 18.75], [1.78166358E12, 47.916666666666664]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166364E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 21.533333333333335, "minX": 1.78166358E12, "maxY": 45.13333333333333, "series": [{"data": [[1.78166364E12, 21.533333333333335], [1.78166358E12, 45.13333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78166364E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 21.533333333333335, "minX": 1.78166358E12, "maxY": 45.13333333333333, "series": [{"data": [[1.78166364E12, 21.533333333333335], [1.78166358E12, 45.13333333333333]], "isOverall": false, "label": "GET /api/posts/feed-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166364E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 21.533333333333335, "minX": 1.78166358E12, "maxY": 45.13333333333333, "series": [{"data": [[1.78166364E12, 21.533333333333335], [1.78166358E12, 45.13333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78166364E12, "title": "Total Transactions Per Second"}},
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

