import { StyleSheet, Dimensions } from 'react-native';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidith: Dimensions.get('window').width
}

export const color = {
    primary: '#0090de',
    secondary: '#6c757d',
    tertiary: '#a1a6ab',
    quartiary: '#d8d8d8',
    lightGray: '#F2F2F2',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    white: '#fff',
    dark: '#23272b',
}

export default AppStyles = StyleSheet.create({
    f1: {
        flex: 1
    },
    f2: {
        flex: 2
    },
    f3: {
        flex: 3
    },
    f4: {
        flex: 4
    },
    f5: {
        flex: 5
    },
    f6: {
        flex: 6
    },
    h25: {
        height: '25%'
    },
    h50: {
        height: '50%'
    },
    h75: {
        height: '75%'
    },
    h100: {
        height: '100%'
    },
    w25: {
        width: '25%'
    },
    w50: {
        width: '50%'
    },
    w75: {
        width: '75%'
    },
    w100: {
        width: '100%'
    },
    p1: {
        padding: 1
    },
    p2: {
        padding: 2
    },
    p3: {
        padding: 3
    },
    p4: {
        padding: 4
    },
    p5: {
        padding: 5
    },
    p10: {
        padding: '10%'
    },
    p15: {
        padding: '15%'
    },
    p20: {
        padding: '20%'
    },
    pt1: {
        paddingTop: 1
    },
    pt2: {
        paddingTop: 2
    },
    pt3: {
        paddingTop: 3
    },
    pt4: {
        paddingTop: 4
    },
    pt5: {
        paddingTop: 5
    },
    pt10: {
        paddingTop: '10%'
    },
    pt15: {
        paddingTop: '15%'
    },
    pt20: {
        paddingTop: '20%'
    },
    pb1: {
        paddingBottom: 1
    },
    pb2: {
        paddingBottom: 2
    },
    pb3: {
        paddingBottom: 3
    },
    pb4: {
        paddingBottom: 4
    },
    pb5: {
        paddingBottom: 5
    },
    pb10: {
        paddingBottom: '10%'
    },
    pb15: {
        paddingBottom: '15%'
    },
    pb20: {
        paddingBottom: '20%'
    },
    pl1: {
        paddingLeft: 1
    },
    pl2: {
        paddingLeft: 2
    },
    pl3: {
        paddingLeft: 3
    },
    pl4: {
        paddingLeft: 4
    },
    pl5: {
        paddingLeft: 5
    },
    pl10: {
        paddingLeft: '10%'
    },
    pl15: {
        paddingLeft: '15%'
    },
    pl20: {
        paddingLeft: '20%'
    },
    pr1: {
        paddingRight: 1
    },
    pr2: {
        paddingRight: 2
    },
    pr3: {
        paddingRight: 3
    },
    pr4: {
        paddingRight: 4
    },
    pr5: {
        paddingRight: 5
    },
    pr10: {
        paddingRight: '10%'
    },
    pr15: {
        paddingRight: '15%'
    },
    pr20: {
        paddingRight: '20%'
    },
    m1: {
        margin: 1
    },
    m2: {
        margin: 2
    },
    m3: {
        margin: 3
    },
    m4: {
        margin: 4
    },
    m5: {
        margin: 5
    },
    m10: {
        margin: '10%'
    },
    m15: {
        margin: '15%'
    },
    m20: {
        margin: '20%'
    },
    mt1: {
        marginTop: 1
    },
    mt2: {
        marginTop: 2
    },
    mt3: {
        marginTop: 3
    },
    mt4: {
        marginTop: 4
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: '10%'
    },
    mt15: {
        marginTop: '15%'
    },
    mt20: {
        marginTop: '20%'
    },
    mb1: {
        marginBottom: 1
    },
    mb2: {
        marginBottom: 2
    },
    mb3: {
        marginBottom: 3
    },
    mb4: {
        marginBottom: 4
    },
    mb5: {
        marginBottom: 5
    },
    mb10: {
        marginBottom: '10%'
    },
    mb15: {
        marginBottom: '15%'
    },
    mb20: {
        marginBottom: '20%'
    },
    ml1: {
        marginLeft: 1
    },
    ml2: {
        marginLeft: 2
    },
    ml3: {
        marginLeft: 3
    },
    ml4: {
        marginLeft: 4
    },
    ml5: {
        marginLeft: 5
    },
    ml10: {
        marginLeft: '10%'
    },
    ml15: {
        marginLeft: '15%'
    },
    ml20: {
        marginLeft: '20%'
    },
    mr1: {
        marginRight: 1
    },
    mr2: {
        marginRight: 2
    },
    mr3: {
        marginRight: 3
    },
    mr4: {
        marginRight: 4
    },
    mr5: {
        marginRight: 5
    },
    mr10: {
        marginRight: '10%'
    },
    mr15: {
        marginRight: '15%'
    },
    mr20: {
        marginRight: '20%'
    },
    row: {
        width: '100%',
        flexDirection: 'row'
    },
    floatStart: {
        alignSelf: 'flex-start'
    },
    floatCenter: {
        alignSelf: 'center'
    },
    floatEnd: {
        alignSelf: 'flex-end'
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 2,
        paddingVertical: 5,
    },
    btnRound: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 2,
        paddingVertical: 5,
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    lowercase: {
        textTransform: 'lowercase'
    },
    captalize: {
        textTransform: 'capitalize'
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    lineTrhough: {
        textDecorationLine: 'line-through'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    underLineThrough: {
        textDecorationLine: 'underline line-through'
    },
    textAuto: {
        textAlignVertical: 'auto'
    },
    textTop: {
        textAlignVertical: 'top'
    },
    textMiddle: {
        textAlignVertical: 'center'
    },
    textBotton: {
        textAlignVertical: 'bottom'
    },
    textLeft: {
        textAlign: 'left'
    },
    textCenter: {
        textAlign: 'center'
    },
    textJustify: {
        textAlign: 'justify'
    },
    textRight: {
        textAlign: 'right'
    },
    doubleLine: {
        textDecorationStyle: 'double'
    },
    dashedLine: {
        textDecorationStyle: 'dashed'
    },
    dottedLine: {
        textDecorationStyle: 'dotted'
    },
    overflowHidden: {
        overflow: 'hidden'
    },
    overflowScroll: {
        overflow: 'scroll'
    },

    textWeight: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    textButton: {
        color: '#fff',
        fontWeight: 'bold',
    },

    textInput: {
        marginTop: 20,
        paddingLeft: 10,
        width: '80%',
        height: 46,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#999'
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: color.primary
    },
});
