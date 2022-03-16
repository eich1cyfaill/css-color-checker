let cssColors = ["red", "orange", "black", "green", "silver", "gray", "white",
"maroon", "purple", "fuchsia", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "aliceblue",
"antiquewhite", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blueviolet", "brown", "burlywood",
"cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson",
"cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki",
"darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
"darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
"dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro",
"ghostwhite", "gold", "goldenrod", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo",
"ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
"lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon",
"lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "limegreen",
    "linen", "magenta", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
    "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream",
    "mistyrose", "moccasin", "navajowhite", "oldlace", "olive", "olivedrab", "orange", "orangered",
"orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peachpuff",
    "peru", "pink", "plum", "powderblue", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
    "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow",
    "springgreen", "steelblue", "tan", "thistle", "tomato", "turquoise", "violet", "wheat", "whitesmoke", "yellowgreen"
]


const isSameDomain = (styleSheet) => {
    if(!styleSheet.href) {
        return true
    }

    return styleSheet.href.indexOf(window.location.origin) === 0
}

const isStyleRule = (rule) => rule.type === 1


const getCSSCustomPropIndex = () => [...document.styleSheets]
    .filter(isSameDomain)
    .reduce((finalArr, sheet) => finalArr.concat(
        [...sheet.cssRules]
            .filter(isStyleRule)
            .reduce((propValArr, rule) => {
            const props = [...rule.style].map((propName) => [
                propName.trim(),
                rule.style.getPropertyValue(propName).trim()
            ])
            return [...propValArr, ...props]
            }, [])
    ), [])



const getColoredCSSProps = () => {
    let coloredArray = []
    getCSSCustomPropIndex().map(el => {
        if((el[1].indexOf('rgb') > -1) || (cssColors.includes(el[1]))){
            coloredArray.push(el[1])
        }
    })
    return [...new Set(coloredArray)]
}

const coloredCssProps = getColoredCSSProps()
console.log(coloredCssProps)

coloredCssProps.map(el => {
    let item = document.createElement("div")
    item.style.width = "200px"
    item.style.height = "200px"
    item.style.background = `${el}`
    item.classList.add('color__item')
    document.body.appendChild(item)
})

console.log(getColoredCSSProps())


let colorItems = document.querySelectorAll('.color__item')
colorItems.forEach(function(el){el.addEventListener('click', showClasses)})

function showClasses(e){
    if(document.body.querySelector('.color__info')){
        document.body.removeChild(document.body.querySelector('.color__info'))
    }
    e.stopPropagation()
    console.log(this)
    let stylesWindow = document.createElement("div")
    stylesWindow.classList.add('color__info')
    stylesWindow.style.background = "grey"
    stylesWindow.style.position = "fixed"
    stylesWindow.style.height = "50vh"
    stylesWindow.style.width = "30vw"
    stylesWindow.style.padding = "30px"
    stylesWindow.style.bottom = "15px"
    stylesWindow.style.right = "15px"
    stylesWindow.style.borderRadius = "25px"
    stylesWindow.style.fontSize = "11px"
    let usedStyles = []
    getCSSCustomPropIndex().map(el => {
        if(this.style.background === el[1]){
            usedStyles.push(el[0])
        }
    })
    console.log(usedStyles)
    let color = document.createElement("h4")
    let colorText = document.createTextNode(this.style.background)
    color.appendChild(colorText)
    stylesWindow.appendChild(color)
    let heading = document.createElement("h6")
    let headingText = document.createTextNode(usedStyles.map(el => `  ${el} `))
    heading.appendChild(headingText)
    stylesWindow.appendChild(heading)
    document.body.appendChild(stylesWindow)
}

document.addEventListener('click', hideClasses)

function hideClasses(){
    if(document.body.querySelector('.color__info')){
        document.body.removeChild(document.body.querySelector('.color__info'))
    }
}