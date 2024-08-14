import CountingVisualization from '$lib/components/problems/CountingVisualization.svelte';
import ClockMatchingProblem from '$lib/components/problems/ClockMatchingProblem.svelte';
import MultiplicationProblem from '$lib/components/problems/MultiplicationProblem.svelte';
import DivisionProblem from '$lib/components/problems//DivisionProblem.svelte';
import SubtractionProblem from '$lib/components/problems//SubtractionProblem.svelte';

const mathTopics = [
    {
        grade: "Kindergarten",
        topics: [
            {
                id: "k-counting",
                name: "Counting and Number Recognition (1-20)",
                problems: [
                    {
                        id: "k-count-1",
                        title: "Count objects up to 5",
                        component: CountingVisualization,
                        props: { maxCount: 5 }
                    },
                    {
                        id: "k-count-2",
                        title: "Count objects up to 10",
                        component: CountingVisualization,
                        props: { maxCount: 10 }
                    },
                    {
                        id: "k-count-3",
                        title: "Count objects up to 20",
                        component: CountingVisualization,
                        props: { maxCount: 20 }
                    },
                    { id: "k-count-4", title: "Match numbers to quantities (1-10)" },
                    { id: "k-count-5", title: "Match numbers to quantities (11-20)" },
                    { id: "k-count-6", title: "Identify missing numbers in sequence (1-10)" },
                    { id: "k-count-7", title: "Identify missing numbers in sequence (11-20)" },
                    { id: "k-count-8", title: "Compare quantities (more, less, equal) up to 10" },
                    { id: "k-count-9", title: "Order numbers from 1 to 10" },
                    { id: "k-count-10", title: "Order numbers from 1 to 20" }
                ]
            },
            {
                id: "k-shapes",
                name: "Basic Shapes",
                problems: [
                    { id: "k-shape-1", title: "Identify circles" },
                    { id: "k-shape-2", title: "Identify squares" },
                    { id: "k-shape-3", title: "Identify triangles" },
                    { id: "k-shape-4", title: "Identify rectangles" },
                    { id: "k-shape-5", title: "Match shapes to real-world objects" },
                    { id: "k-shape-6", title: "Sort objects by shape" },
                    { id: "k-shape-7", title: "Draw basic shapes" },
                    { id: "k-shape-8", title: "Identify shapes in different orientations" },
                    { id: "k-shape-9", title: "Compare sizes of shapes (bigger, smaller)" },
                    { id: "k-shape-10", title: "Create patterns with shapes" }
                ]
            },
            {
                id: "k-addition",
                name: "Simple Addition (up to 5)",
                problems: [
                    { id: "k-add-1", title: "Add objects up to 3" },
                    { id: "k-add-2", title: "Add objects up to 5" },
                    { id: "k-add-3", title: "Complete addition sentences (e.g., 2 + __ = 4)" },
                    { id: "k-add-4", title: "Add zero to a number" },
                    { id: "k-add-5", title: "Visualize addition with objects" },
                    { id: "k-add-6", title: "Use a number line for addition up to 5" },
                    { id: "k-add-7", title: "Solve simple word problems with addition" },
                    { id: "k-add-8", title: "Find all pairs of numbers that add up to 5" },
                    { id: "k-add-9", title: "Practice addition facts up to 5" },
                    { id: "k-add-10", title: "Compare sums up to 5" }
                ]
            },
            {
                id: "k-subtraction",
                name: "Simple Subtraction (up to 5)",
                problems: [
                    { id: "k-sub-1", title: "Subtract from 3", component: SubtractionProblem, props: { "maxNumber": 3 } },
                    { id: "k-sub-2", title: "Subtract from 5", component: SubtractionProblem, props: { "maxNumber": 5 } },
                    { id: "k-sub-3", title: "Complete subtraction sentences (e.g., 5 - __ = 3)" },
                    { id: "k-sub-4", title: "Subtract zero from a number" },
                    { id: "k-sub-5", title: "Visualize subtraction with objects" },
                    { id: "k-sub-6", title: "Use a number line for subtraction up to 5" },
                    { id: "k-sub-7", title: "Solve simple word problems with subtraction" },
                    { id: "k-sub-8", title: "Practice subtraction facts up to 5" },
                    { id: "k-sub-9", title: "Compare differences up to 5" },
                    { id: "k-sub-10", title: "Relate addition to subtraction (e.g., 5 - 2 = 3, so 3 + 2 = 5)" }
                ]
            }
        ]
    },
    {
        grade: "1st Grade",
        topics: [
            {
                id: "1-addition-subtraction",
                name: "Addition and Subtraction (up to 20)",
                problems: [
                    { id: "1-addSub-1", title: "Add numbers with sum up to 10" },
                    { id: "1-addSub-2", title: "Add numbers with sum up to 20" },
                    { id: "1-addSub-3", title: "Subtract from numbers up to 10", component: SubtractionProblem, props: { "maxNumber": 10 } },
                    { id: "1-addSub-4", title: "Subtract from numbers up to 20", component: SubtractionProblem, props: { "maxNumber": 20 } },
                    { id: "1-addSub-5", title: "Complete number sentences (e.g., 7 + __ = 12)" },
                    { id: "1-addSub-6", title: "Word problems with addition and subtraction" },
                    { id: "1-addSub-7", title: "Find pairs of numbers that add up to 10" },
                    { id: "1-addSub-8", title: "Find pairs of numbers that add up to 20" },
                    { id: "1-addSub-9", title: "Practice addition and subtraction facts up to 20" },
                    { id: "1-addSub-10", title: "Use a number line for addition and subtraction up to 20" }
                ]
            },
            {
                id: "1-place-value",
                name: "Place Value (tens and ones)",
                problems: [
                    { id: "1-place-1", title: "Group objects into tens and ones" },
                    { id: "1-place-2", title: "Write numbers in expanded form (e.g., 34 = 30 + 4)" },
                    { id: "1-place-3", title: "Compare two-digit numbers using >, <, or =" },
                    { id: "1-place-4", title: "Order numbers up to 100" },
                    { id: "1-place-5", title: "Identify tens and ones in a two-digit number" },
                    { id: "1-place-6", title: "Count by tens up to 100" },
                    { id: "1-place-7", title: "Add multiples of 10 to a two-digit number" },
                    { id: "1-place-8", title: "Subtract multiples of 10 from a two-digit number" },
                    { id: "1-place-9", title: "Use place value to mentally add or subtract 10" },
                    { id: "1-place-10", title: "Solve word problems involving tens and ones" }
                ]
            },
            {
                id: "1-comparing-numbers",
                name: "Comparing Numbers",
                problems: [
                    { id: "1-compare-1", title: "Compare numbers up to 20 using symbols (>, <, =)" },
                    { id: "1-compare-2", title: "Compare numbers up to 100 using symbols (>, <, =)" },
                    { id: "1-compare-3", title: "Order three numbers from least to greatest" },
                    { id: "1-compare-4", title: "Order three numbers from greatest to least" },
                    { id: "1-compare-5", title: "Identify numbers that come before and after a given number" },
                    { id: "1-compare-6", title: "Find numbers between two given numbers" },
                    { id: "1-compare-7", title: "Compare numbers using a number line" },
                    { id: "1-compare-8", title: "Use comparison words (more, less, equal) in word problems" },
                    { id: "1-compare-9", title: "Compare numbers using tens and ones" },
                    { id: "1-compare-10", title: "Find the smallest and largest numbers in a set" }
                ]
            },
            {
                id: "1-measurement",
                name: "Basic Measurement (length)",
                problems: [
                    { id: "1-measure-1", title: "Measure objects using non-standard units" },
                    { id: "1-measure-2", title: "Compare lengths of objects" },
                    { id: "1-measure-3", title: "Order objects by length" },
                    { id: "1-measure-4", title: "Introduce standard units (inches, centimeters)" },
                    { id: "1-measure-5", title: "Measure objects to the nearest inch" },
                    { id: "1-measure-6", title: "Measure objects to the nearest centimeter" },
                    { id: "1-measure-7", title: "Estimate lengths of objects" },
                    { id: "1-measure-8", title: "Solve simple addition problems involving lengths" },
                    { id: "1-measure-9", title: "Solve simple subtraction problems involving lengths" },
                    { id: "1-measure-10", title: "Use a ruler to measure length" }
                ]
            },
            {
                id: "1-time",
                name: "Time (hours and half-hours)",
                problems: [
                    {
                        id: "1-time-1", title: "Read time to the hour on analog clocks",
                        component: ClockMatchingProblem,
                        props: {
                            problemType: 'matchAnalogToDigital', accuracy: 'hour'
                        }
                    },
                    {
                        id: "1-time-2", title: "Read time to the half-hour on analog clocks", component: ClockMatchingProblem, props: {
                            problemType: 'matchAnalogToDigital', accuracy: 'halfHour'
                        }
                    },
                    // { id: "1-time-3", title: "Draw hands on a clock to show time to the hour" },
                    // { id: "1-time-4", title: "Draw hands on a clock to show time to the half-hour" },
                    {
                        id: "1-time-5", title: "Match digital and analog clock times (hours)", component: ClockMatchingProblem, props: {
                            problemType: 'matchDigitalToAnalog', accuracy: 'hour'
                        }
                    },
                    {
                        id: "1-time-6", title: "Match digital and analog clock times (half-hours)", component: ClockMatchingProblem, props: {
                            problemType: 'matchDigitalToAnalog', accuracy: 'halfHour'
                        }
                    },
                    { id: "1-time-7", title: "Solve simple word problems involving time" },
                    { id: "1-time-8", title: "Sequence daily events by time" },
                    { id: "1-time-9", title: "Distinguish between a.m. and p.m." },
                    { id: "1-time-10", title: "Calculate durations of one hour or half-hour" }
                ]
            }
        ]
    },
    {
        grade: "2nd Grade",
        topics: [
            {
                id: "2-addition-subtraction",
                name: "Addition and Subtraction",
                problems: [
                    { id: "2-addSub-1", title: "Add two-digit numbers without regrouping" },
                    { id: "2-addSub-2", title: "Add two-digit numbers with regrouping" },
                    { id: "2-addSub-3", title: "Subtract two-digit numbers without regrouping", component: SubtractionProblem, props: { "maxNumber": 99, "regrouping": false } },
                    { id: "2-addSub-4", title: "Subtract two-digit numbers with regrouping", component: SubtractionProblem, props: { "maxNumber": 99 } },
                    { id: "2-addSub-5", title: "Subtract three-digit numbers without regrouping", component: SubtractionProblem, props: { "maxNumber": 999, "minNumber": 100, "regrouping": false } },
                    { id: "2-addSub-6", title: "Subtract three-digit numbers with regrouping", component: SubtractionProblem, props: { "maxNumber": 999, "minNumber": 100 } },
                    { id: "2-addSub-8", title: "Use mental math strategies for addition" },
                    { id: "2-addSub-9", title: "Use mental math strategies for subtraction" },
                    { id: "2-addSub-10", title: "Add three two-digit numbers" },
                    { id: "2-addSub-11", title: "Find missing addends in equations (e.g., 45 + __ = 72)" }
                ]
            },
            {
                id: "2-multiplication",
                name: "Introduction to Multiplication",
                problems: [
                    { id: "2-mult-1", title: "Skip counting by 2s up to 20" },
                    { id: "2-mult-2", title: "Skip counting by 5s up to 50" },
                    { id: "2-mult-3", title: "Skip counting by 10s up to 100" },
                    { id: "2-mult-4", title: "Create and interpret simple arrays" },
                    { id: "2-mult-5", title: "Solve problems using repeated addition" },
                    { id: "2-mult-6", title: "Match multiplication sentences to visual representations" },
                    { id: "2-mult-7", title: "Introduce the concept of commutativity (2 × 3 = 3 × 2)" },
                    { id: "2-mult-8", title: "Multiply by 2 up to 2 × 10" },
                    { id: "2-mult-9", title: "Multiply by 5 up to 5 × 10" },
                    { id: "2-mult-10", title: "Solve simple word problems involving multiplication" }
                ]
            },
            {
                id: "2-even-odd",
                name: "Even and Odd Numbers",
                problems: [
                    { id: "2-evenOdd-1", title: "Identify even numbers up to 20" },
                    { id: "2-evenOdd-2", title: "Identify odd numbers up to 20" },
                    { id: "2-evenOdd-3", title: "Sort numbers into even and odd groups" },
                    { id: "2-evenOdd-4", title: "Recognize patterns in even and odd numbers" },
                    { id: "2-evenOdd-5", title: "Determine if a sum is even or odd" },
                    { id: "2-evenOdd-6", title: "Determine if a difference is even or odd" },
                    { id: "2-evenOdd-7", title: "Use manipulatives to demonstrate even and odd numbers" },
                    { id: "2-evenOdd-8", title: "Solve word problems involving even and odd numbers" },
                    { id: "2-evenOdd-9", title: "Identify even and odd numbers up to 100" },
                    { id: "2-evenOdd-10", title: "Explore patterns when adding even and odd numbers" }
                ]
            },
            {
                id: "2-money",
                name: "Money (coins and bills)",
                problems: [
                    { id: "2-money-1", title: "Identify coins and their values" },
                    { id: "2-money-2", title: "Count a collection of coins up to $1" },
                    { id: "2-money-3", title: "Make a given amount using different coin combinations" },
                    { id: "2-money-4", title: "Solve word problems involving coins" },
                    { id: "2-money-5", title: "Identify bills ($1, $5, $10, $20)" },
                    { id: "2-money-6", title: "Count a collection of coins and bills up to $20" },
                    { id: "2-money-7", title: "Make change from $1" },
                    { id: "2-money-8", title: "Compare amounts of money" },
                    { id: "2-money-9", title: "Solve simple addition and subtraction problems with money" },
                    { id: "2-money-10", title: "Use $ and ¢ symbols correctly" }
                ]
            },
            {
                id: "2-geometry",
                name: "Geometry (2D and 3D shapes)",
                problems: [
                    { id: "2-geo-1", title: "Identify and describe 2D shapes (circle, square, triangle, rectangle)" },
                    { id: "2-geo-2", title: "Identify and describe 3D shapes (cube, sphere, cylinder, cone)" },
                    { id: "2-geo-3", title: "Count faces, edges, and vertices of 3D shapes" },
                    { id: "2-geo-4", title: "Draw 2D shapes" },
                    { id: "2-geo-5", title: "Create patterns with 2D shapes" },
                    { id: "2-geo-6", title: "Identify lines of symmetry in 2D shapes" },
                    { id: "2-geo-7", title: "Recognize 2D shapes in everyday objects" },
                    { id: "2-geo-8", title: "Recognize 3D shapes in everyday objects" },
                    { id: "2-geo-9", title: "Compare and contrast 2D and 3D shapes" },
                    { id: "2-geo-10", title: "Solve simple problems involving shapes and their attributes" }
                ]
            }
        ]
    },
    {
        grade: "3rd Grade",
        topics: [
            {
                id: "3-multiplication",
                name: "Multiplication",
                problems: [
                    {
                        id: "3-mult-2", title: "Multiply with number 2", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 2 }
                    },
                    {
                        id: "3-mult-3", title: "Multiply with number 3", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 3 }
                    },
                    {
                        id: "3-mult-4", title: "Multiply with number 4", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 4 }
                    },
                    {
                        id: "3-mult-5", title: "Multiply with number 5", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 5 }
                    },
                    {
                        id: "3-mult-6", title: "Multiply with number 6", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 6 }
                    },
                    {
                        id: "3-mult-7", title: "Multiply with number 7", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 7 }
                    },
                    {
                        id: "3-mult-8", title: "Multiply with number 8", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 8 }
                    },
                    {
                        id: "3-mult-9", title: "Multiply with number 9", component: MultiplicationProblem, props: { "maxFactor": 10, firstFactor: 9 }
                    },
                    {
                        id: "3-mult-singledigit", title: "Multiply single-digit numbers", component: MultiplicationProblem, props: { "maxFactor": 10 }
                    },
                ]
            },
            {
                id: "3-division",
                name: "Division",
                problems: [
                    { id: "3-div-2", title: "Divide with number 2", component: DivisionProblem, props: { "fixedDivisor": 2 } },
                    { id: "3-div-3", title: "Divide with number 3", component: DivisionProblem, props: { "fixedDivisor": 3 } },
                    { id: "3-div-4", title: "Divide with number 4", component: DivisionProblem, props: { "fixedDivisor": 4 } },
                    { id: "3-div-5", title: "Divide with number 5", component: DivisionProblem, props: { "fixedDivisor": 5 } },
                    { id: "3-div-6", title: "Divide with number 6", component: DivisionProblem, props: { "fixedDivisor": 6 } },
                    { id: "3-div-7", title: "Divide with number 7", component: DivisionProblem, props: { "fixedDivisor": 7 } },
                    { id: "3-div-8", title: "Divide with number 8", component: DivisionProblem, props: { "fixedDivisor": 8 } },
                    { id: "3-div-9", title: "Divide with number 9", component: DivisionProblem, props: { "fixedDivisor": 9 } },
                    { id: "3-div-singledigit", title: "Divide single-digit numbers", component: DivisionProblem, props: {} },
                    { id: "3-div-remainder", title: "Divide with remainer", component: DivisionProblem, props: { "allowRemainder": true } },

                    // { id: "3-multDiv-3", title: "Multiply by multiples of 10" },
                    // { id: "3-multDiv-4", title: "Use the distributive property" },
                    // { id: "3-multDiv-5", title: "Solve word problems involving multiplication" },
                    // { id: "3-multDiv-6", title: "Solve word problems involving division" },
                    // { id: "3-multDiv-7", title: "Understand the relationship between multiplication and division" },
                    // { id: "3-multDiv-8", title: "Use arrays to model multiplication and division" },
                    // { id: "3-multDiv-9", title: "Find missing factors in multiplication equations" },
                    // { id: "3-multDiv-10", title: "Divide with remainders" }
                ]
            },
            {
                id: "3-fractions",
                name: "Fractions",
                problems: [
                    { id: "3-frac-1", title: "Identify and shade unit fractions" },
                    { id: "3-frac-2", title: "Compare fractions with the same denominator" },
                    { id: "3-frac-3", title: "Locate fractions on a number line" },
                    { id: "3-frac-4", title: "Find equivalent fractions using visual models" },
                    { id: "3-frac-5", title: "Solve word problems involving fractions of a set" },
                    { id: "3-frac-6", title: "Add fractions with the same denominator" },
                    { id: "3-frac-7", title: "Subtract fractions with the same denominator" },
                    { id: "3-frac-8", title: "Compare fractions with different denominators" },
                    { id: "3-frac-9", title: "Recognize and generate simple equivalent fractions" },
                    { id: "3-frac-10", title: "Express whole numbers as fractions" }
                ]
            },
            {
                id: "3-area-perimeter",
                name: "Area and Perimeter",
                problems: [
                    { id: "3-areaPeri-1", title: "Calculate the perimeter of rectangles" },
                    { id: "3-areaPeri-2", title: "Calculate the area of rectangles" },
                    { id: "3-areaPeri-3", title: "Find the missing side length given area or perimeter" },
                    { id: "3-areaPeri-4", title: "Solve word problems involving perimeter" },
                    { id: "3-areaPeri-5", title: "Solve word problems involving area" },
                    { id: "3-areaPeri-6", title: "Compare areas of rectangles" },
                    { id: "3-areaPeri-7", title: "Compare perimeters of rectangles" },
                    { id: "3-areaPeri-8", title: "Understand the relationship between area and perimeter" },
                    { id: "3-areaPeri-9", title: "Estimate areas of irregular shapes" },
                    { id: "3-areaPeri-10", title: "Use tiling to find area of rectangles" }
                ]
            },
            {
                id: "3-time",
                name: "Telling Time to the Minute",
                problems: [
                    {
                        id: "3-time-1", title: "Read analog clocks to the nearest minute", component: ClockMatchingProblem, props: {
                            problemType: 'matchAnalogToDigital', accuracy: 'minute'
                        }
                    },
                    {
                        id: "3-time-2", title: "Match digital and analog clock times (minute)", component: ClockMatchingProblem, props: {
                            problemType: 'matchDigitalToAnalog', accuracy: 'minute'
                        }
                    },
                    { id: "3-time-3", title: "Calculate elapsed time within an hour" },
                    { id: "3-time-4", title: "Calculate elapsed time across hours" },
                    { id: "3-time-5", title: "Solve word problems involving time intervals" },
                    { id: "3-time-6", title: "Convert between hours and minutes" },
                    { id: "3-time-7", title: "Use a.m. and p.m. correctly" },
                    { id: "3-time-8", title: "Read and create schedules" },
                    { id: "3-time-9", title: "Estimate reasonable durations of events" },
                    { id: "3-time-10", title: "Understand relationships between units of time" }
                ]
            },
            {
                id: "3-decimals",
                name: "Introduction to Decimals",
                problems: [
                    { id: "3-dec-1", title: "Understand tenths as fractions" },
                    { id: "3-dec-2", title: "Understand hundredths as fractions" },
                    { id: "3-dec-3", title: "Write decimals for tenths and hundredths" },
                    { id: "3-dec-4", title: "Locate decimals on a number line" },
                    { id: "3-dec-5", title: "Compare decimals to the hundredths place" },
                    { id: "3-dec-6", title: "Order decimals to the hundredths place" },
                    { id: "3-dec-7", title: "Relate decimals to money" },
                    { id: "3-dec-8", title: "Add decimals to the hundredths place" },
                    { id: "3-dec-9", title: "Subtract decimals to the hundredths place" },
                    { id: "3-dec-10", title: "Solve simple word problems involving decimals" }
                ]
            }
        ]
    }
];

export default mathTopics;