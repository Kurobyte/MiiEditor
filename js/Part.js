/**
 * Instancia un objecte de la clase Part que contindra les dades de parts del Mii
 * @param   {String} imatge  Url on es troba la imatge que conte les parts.
 * @param   {Number} amplada Amplada de la part(Amplada unitaria, no el total de la imatge)
 * @param   {Number} alsada  Alçada de la part(Alçada unitaria, no el total de la imatge)
 * @param   {Boolean} pintat  Determina si es una Part que es pintará per defecte
 * @param   {Number} limF    Marca quina sera la fila limit dintre de la imatge
 * @param   {Number} limC    Marca quina sera la columna limit dintre de la imatge
 * @param   {String}   color   Pasa un color en hexadecimal que tindra la part. De pasar undefinied automaticament asignará el color negre.
 * @param   {Number} sep     Separació que tindrá en cas de ser un element composat.
 * @param   {Number} angle   Angle que rotará la part en cas de que sigui una part rotable.
 * @returns {Part} Retorna una instancia de la clase Part.
 */
function Part(imatge, amplada, alsada, pintat, limF, limC, color, sep, angle) {
    this.img;
    this.imgName = imatge;
    this.pintat = pintat;
    
    this.amp = amplada;
    this.al = alsada;
    this.color;
    this.separacio = sep;
    this.x = 0;
    this.y = 0;
    this.tamany = 0.7;
    this.angle = angle;
    
    this.fila = 0;
    this.col = 0;
    this.limit = {F:0, C:0};
    
    //Generem una imatge i hi asignem la url per carregarla
    this.img = document.createElement('img');
    this.img.setAttribute('src', this.imgName);
    
    this.limit.F = limF;
    this.limit.C = limC;
    
    this.color = color == undefined ? {R:0 ,G:0 ,B:0 } : hexToRGB(color);
    
    /**
     * Asigna un color a la part
     * @param {String} hex Color en Hexadecimal ej: '#FF0000' <- Vermell
     */
    this.setColorHex = function(hex) {
        this.color = hexToRGB(hex);
    }
    
    /**
     * Retorna el color de la part en hexadecimal
     * @returns {String} Color en Hexadecimal ej: '#FF0000' <- Vermell
     */
    this.getHexColor = function() {
        return RGBtohex(this.color);
    }
    
    /**
     * Converteix un color en Hexadecimal en RGB
     * @param   {String}   hex Color en Hexadecimal ej: '#FF0000' <- Vermell
     * @returns {Object} Retorna un objecte amb el color, ej: '{R:0 ,G:0 ,B:0 }' <- Negre
     */
    function hexToRGB(hex){
        var c = {R:0 ,G:0 ,B:0 };
        c.R = (parseInt(hex.substr(1,2), 16));
        c.G = (parseInt(hex.substr(3,2), 16));
        c.B = (parseInt(hex.substr(5,2), 16));
        
        return c;
    }
    
    /**
     * Converteix un objecte de color {R:0 ,G:0 ,B:0 } a el seu valor Hexadecimal
     * @param   {Object}   rgb Objecte de color RGB, ej: '{R:0 ,G:0 ,B:0 }' <- Negre
     * @returns {String} String amb el color en Hexadecimal
     */
    function RGBtohex(rgb) {
        var str = "#";
        str += (rgb.R+0x10000).toString(16).substr(-2);
        str += (rgb.G+0x10000).toString(16).substr(-2);
        str += (rgb.B+0x10000).toString(16).substr(-2);
        
        return str;
    }
}