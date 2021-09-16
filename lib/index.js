

/**
 * 为float或者其他数字置为百分制
 * @param {number} str
 */
 const NumTs = (str)=>{
    if (str.toString().indexOf("%")===-1) {
        str = (Number(str)*100)+"%"
    }
    return str
}
/**
 * 转换公式http://en.wikipedia.org/wiki/HSL_color_space
 * @param {float} h 色调 hue 0~360;
 * @param {float} s 饱和度 saturation 0～1；
 * @param {float} l 亮度 lightness 0～1
 * @return {Object} rgb色值
 */
const hslToRgb = (h,s,l) => {
    h = Number(h)
    s = Number(s)
    l = Number(l)
    let t1 ,t2,hk,r,g,b;
    if (s === 0 ) {
        r = g = b = l
    }
    if (s !== 0) {
        const hue2rgb = (p, q, t) =>{
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        t1 = l >= 0.5 ? l + s - (l * s) : l * (1 + s)
        t2 = 2 * l - t1
        hk = h/360

        r = hue2rgb(t2,t1,hk + 1/3)
        g = hue2rgb(t2,t1,hk)
        b = hue2rgb(t2,t1,hk - 1/3)
    }
    return {r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)}
}
/**
 * 转换公式 -----> 
 * C = V * S
 * ....懒得写了
 * @param {float} h hue 色相 0～360
 * @param {float} s saturation 饱和度 0～1
 * @param {float} v value 色调 0～1
 * @return {Object} rgb色值
 */
const hsvToRgb = (h,s,v) =>{
    let arr = []
    let C = v * s
    let X = C * (1 - Math.abs(((h/60)%2-1))) 
    let m = v - C
    switch (~~(h/60)){
        case 0:  arr = [C,X,0]
        break;
        case 1:  arr = [X,C,0]
        break;
        case 2:  arr = [0,C,X]
        break;
        case 3:  arr = [0,X,C]
        break;
        case 4:  arr = [X,0,C]
        break;
        case 5:  arr = [C,0,X]
        break;
        default :arr = [C,X,0]
    }
    const obj = arr.map(item=>{
        return Math.round((item + m) * 255)
    })
    return {r:obj[0],g:obj[1],b:obj[2]}
}
/**
 * @param {int} r  red 0~255
 * @param {int} g  green 0~255
 * @param {int} b  blue 0~255
 * @return {object} hsl色值
 */
const rgbToHsl = (r,g,b) =>{

    let R1 = r/255,G1 = g/255,B1 = b/255,h,s,l
    let Cmax = Math.max([R1,G1,B1])
    let Cmin = Math.min([R1,G1,B1])
    const cel = Cmax - Cmin;
    if (cel === 0) {
        h = 0;
    }else{
        switch(Cmax){
            case R1: h = 60 * (((G1-B1)/cel)%6) 
                break;
            case G1: h = 60 * (((B1-R1)/cel)+2) 
                break;
            case B1: h = 60 * (((R1-G1)/cel)+4) 
                break;
            default :h = 0
        }
    }
    l  = (Cmax + Cmin)/2;

    s = Cmax === Cmin || l === 0 ? 0 : l > 0 && l <= (1/2) ? cel/(2*l) : cel/(2-2 * l)

    return {h,s,l}

}
/**
 * 转换公式自行百度
 * @param {int} r  red 0~255
 * @param {int} g  green 0~255
 * @param {int} b  blue 0~255
 * @return {object} hsv 色值
 */
const rgbToHsv = (r,g,b) =>{

    let R1 = r/255,G1 = g/255,B1 = b/255,H,S,V
    let Cmax = Math.max([R1,G1,B1])
    let Cmin = Math.min([R1,G1,B1])
    const cel = Cmax - Cmin;
    if (cel === 0) {
        H = 0;
    }else{
        switch(Cmax){
            case R1: H = 60 * (((G1-B1)/cel)%6) 
                break;
            case G1: H = 60 * (((B1-R1)/cel)+2) 
                break;
            case B1: H = 60 * (((R1-G1)/cel)+4) 
                break;
            default :H = 0
        }
    }
    S = Cmax === 0 ? 0 : cel/Cmax
    V  = Cmax
    
    return {h:H,s:S,V:v}
}
/**
 * 255 的16进制 --> FF
 * @param {int} r  red 0~255
 * @param {int} g  green 0~255
 * @param {int} b  blue 0~255
 * @return {string} Hex 色值
 */
const rgbToHex = (r,g,b) =>{

    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
/**
 * FF 的10进制 --> 255
 * @param {string} hex #ffffff
 * @return {object} Hex 色值
 */
const hexToRgb = (r,g,b) =>{

    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}


module.exports = {
    NumTs,
    hslToRgb,
    hsvToRgb,
    rgbToHsl,
    rgbToHsv,
    rgbToHex,
    hexToRgb
}