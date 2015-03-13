/**
 * Instancia un objecte de tipus MiiEditor el cual conte els controls i funcions per editar un mii.
 * @returns {MiiEditor} Instancia de la clase MiiEditor.
 */
function MiiEditor() {
    /*Parametres*/
    this.varName;
    this.canvas;
    this.miiParts = {};
    this.color = {R:0 ,G:0 ,B:0 };
    
    /*funcions*/
    /**
     * Funció principal que construeix tot el editor, carregant les imatges i crea els controls per dibuixar el Mii.
     */
    this.SetupEditor = function() {
        if (this.varName == undefined) {
            for (var name in window) 
                if (window[name] == this) 
                    this.varName = name;
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'mii');
        this.canvas.setAttribute('width', '500');
        this.canvas.setAttribute('height', '500');
        
        //Creem totes les imatges i les asignem a un objecte que contingui totes les parts.
        this.miiParts['beards'] = new Part('imatges/mii_beards.png', 120, 120, false, 2, 7, undefined, 0, 0);
        this.miiParts['eyebrows'] = new Part('imatges/mii_eyebrows.png', 35, 59, true, 2, 8, '#FF0000', 13, 1);
        this.miiParts['eyes_1'] = new Part('imatges/mii_eyes1.png', 55, 54, true, 7, 5, undefined, -5, 0.7);
        this.miiParts['eyes_2'] = new Part('imatges/mii_eyes2.png', 55, 54, true, 7, 5, '#11AAFF', -5, 0.7);
        this.miiParts['eyes_3'] = new Part('imatges/mii_eyes3.png', 55, 54, true, 7, 5, undefined, -5, 0.7);
        this.miiParts['features'] = new Part('imatges/mii_features.png', 120, 120, false, 5, 0, undefined, 0, 0);
        this.miiParts['beards'] = new Part('imatges/mii_beards.png', 120, 136, false, 2, 0, undefined, 0, 0);
        this.miiParts['glasses'] = new Part('imatges/mii_glasses.png', 180, 75, false, 1, 3, undefined, 0, 0);
        this.miiParts['hairs_1'] = new Part('imatges/mii_hairs1.png', 120, 120, true, 6, 7, '#FF0000', 0, 0);
        this.miiParts['hairs_2'] = new Part('imatges/mii_hairs2.png', 120, 120, false, 1, 7, '#FF0000', 0, 0);
        this.miiParts['heads'] = new Part('imatges/mii_heads.png', 120, 120, true, 1, 3, '#fde2e0', 0, 0);
        this.miiParts['lips'] = new Part('imatges/mii_lips.png', 60, 60, true, 4, 4, undefined, 0, 0);
        this.miiParts['mole'] = new Part('imatges/mii_mole.png', 12, 12, false, 0, 0, undefined, 0, 0);
        this.miiParts['mustache'] = new Part('imatges/mii_mustache.png', 60,60, false, 0, 2, '#000000', 0, 0);
        this.miiParts['noses'] = new Part('imatges/mii_noses.png', 50, 48, true, 1, 5, '#fde2e0', 0, 0);
        
        var miiEdit = document.createElement('div');
        miiEdit.setAttribute('id', 'editor');
        document.body.appendChild(miiEdit);
        
        var controls = document.createElement('div');
        controls.setAttribute('id', 'controls');
        miiEdit.appendChild(controls);
        miiEdit.appendChild(this.canvas);
        var miiOpcions = document.createElement('div');
        miiOpcions.setAttribute('id', 'tools');
        
        miiEdit.appendChild(miiOpcions);
        
        //GENEREM EL MENU /TABS\
        var divTab = document.createElement('div');
        controls.appendChild(divTab);
        var menu = document.createElement('ul');
        var entrys = ['heads:Caps', 'hair:Pentinats', 'lips:Llavis', 'eyes:Ulls', 'noses:Nasos','eyebrows:Celles', 'features:Extres', 'glasses:Ulleres', 'mustache:Bigoti', 'beards:Barba','mole:Piga'];
        for (var i = 0; i < entrys.length; i++) {
            var entryMenu = document.createElement('li');
            var item = entrys[i].split(':'); 
            entryMenu.innerHTML = '<a href="#'+item[0]+'" >'+item[1]+'</a>'; 
            menu.appendChild(entryMenu);
        }
        
        divTab.appendChild(menu);
        
        divTab.setAttribute('id', 'tabs');
        
        //Generem els menus i els seus controls amb les peces de cada part.
        divTab.appendChild(generaMenus(undefined,this.miiParts.heads,'heads', 'heads','head', this.varName, false));
        var divHair = generaMenus(undefined,this.miiParts.hairs_1,'hairs_1','hair', 'hair', this.varName, false);
        divTab.appendChild(generaMenus(divHair,this.miiParts.hairs_2,'hairs_2','hair', 'hair', this.varName, false));
        divTab.appendChild(generaMenus(undefined,this.miiParts.lips,'lips','lips', 'lips', this.varName, false));
        divTab.appendChild(generaMenus(undefined,this.miiParts.noses,'noses','noses', 'noses', this.varName, false));
        divTab.appendChild(generaMenus(undefined,this.miiParts.eyes_3,'eyes_3','eyes', 'eyes', this.varName, false));
        
        divTab.appendChild(generaMenus(undefined,this.miiParts.eyebrows,'eyebrows','eyebrows', 'eyebrows', this.varName, false));
        divTab.appendChild(generaMenus(undefined,this.miiParts.features,'features','features', 'features', this.varName, true));
        divTab.appendChild(generaMenus(undefined,this.miiParts.glasses,'glasses','glasses', 'glasses', this.varName, true));
        divTab.appendChild(generaMenus(undefined,this.miiParts.mustache,'mustache','mustache', 'mustache', this.varName, true));
        divTab.appendChild(generaMenus(undefined,this.miiParts.beards,'beards','beards', 'beards', this.varName, true));
        divTab.appendChild(generaMenus(undefined,this.miiParts.mole,'mole','mole', 'mole', this.varName, true));
        
        var that = this;
        window.onload = function() { that.onDraw(); }; //Un cop s'hagin carregat totes les imatges executará un onDraw(); I pintará un Mii perdefecte;
        this.loadTools('heads'); //Carrega les eines del apartat 'heads'
    }
    
    /**
     * Funcio que pinta totes les parts del Mii en ordre(sempre i cuan aquestes estiguin marcades per pintar)
     */
    this.onDraw = function() {
        var can = document.createElement('canvas');
        can.width = this.canvas.width;
        can.height = this.canvas.height;
        
        var ctxOrig = this.canvas.getContext('2d');
        var ctx = can.getContext('2d');
        ctxOrig.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var part = this.miiParts.heads; //HEAD
        ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B),200,100);
        
        if (this.miiParts.mole.pintat) { //MOLE
            var part = this.miiParts.mole;
            
            ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B),265 + part.x , 185 + part.y, 12 * part.tamany, 12 * part.tamany);
        }
        
        if (this.miiParts.features.pintat) { //FEATURES
            var part = this.miiParts.features;
            var pos = this.miiParts.heads.col;
            if (this.miiParts.heads.fila == 1) {
                pos = 4 + this.miiParts.heads.col;
            }
            
            ctx.drawImage(retallaImatge(part.img, part.amp, part.al, part.fila, part.col + pos),200,100);
        }
        
        if (this.miiParts.beards.pintat) { //FEATURES
            var part = this.miiParts.beards;
            var pos = this.miiParts.heads.col;
            if (this.miiParts.heads.fila == 1) {
                pos = 4 + this.miiParts.heads.col;
            }
            
            ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col + pos), part.color.R , part.color.G , part.color.B),200,95);
        }
        
        part = this.miiParts.lips; //LIPS
        ctx.drawImage(retallaImatge(part.img, part.amp, part.al, part.fila, part.col),240 + part.x ,165 + part.y, 55 * part.tamany, 55 * part.tamany);
        
        if (this.miiParts.mustache.pintat) { //MUSTACHE
            var part = this.miiParts.mustache;
            
            ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B),242 + part.x , 175 + part.y, 47 * part.tamany, 47 * part.tamany);
        }
        
        part = this.miiParts.noses; //NASOS
        ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B),243 + part.x ,148 + part.y , 47 * part.tamany, 47 * part.tamany);
        
        part = this.miiParts.eyes_2; //EYES 
        var canEyes = canviaColor(compositeMirror(part, part.separacio), part.color.R , part.color.G , part.color.B); //FER CAPES ULLS
        ctx.drawImage(canEyes,225 + part.x,127 + part.y,canEyes.width * part.tamany, canEyes.height * part.tamany);
        
        part = this.miiParts.eyes_1; //EYES
        canEyes = compositeMirror(part, part.separacio); //FER CAPES ULLS
        ctx.drawImage(canEyes,225 + part.x,127 + part.y,canEyes.width * part.tamany, canEyes.height * part.tamany);
        
        part = this.miiParts.eyes_3; //EYES
        canEyes = compositeMirror(part, part.separacio); //FER CAPES ULLS
        ctx.drawImage(canEyes,225 + part.x,127 + part.y,canEyes.width * part.tamany, canEyes.height * part.tamany);
        
        part = this.miiParts.eyebrows; //EYEBROWS
        var brows = canviaColor(compositeMirror(part, part.separacio), part.color.R, part.color.G, part.color.B);
        ctx.drawImage(brows,225 + part.x, 121 + part.y, brows.width * part.tamany, brows.height * part.tamany);
        
        if (this.miiParts.hairs_1.pintat) //HAIR
            part = this.miiParts.hairs_1;
        else
            part = this.miiParts.hairs_2;
        ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B),200,90);
        
        if (this.miiParts.glasses.pintat) { //GLASSES
            var part = this.miiParts.glasses;
            if (part.fila == 1 && part.col > 0){
                ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila + 1, part.col - 1), part.color.R , part.color.G , part.color.B),217 + part.x , 130 + part.y, 123 * part.tamany, 53 * part.tamany);
                ctx.drawImage(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), 218 + part.x , 130 + part.y, 120 * part.tamany, 50 * part.tamany);
            } else {
                ctx.drawImage(canviaColor(retallaImatge(part.img, part.amp, part.al, part.fila, part.col), part.color.R , part.color.G , part.color.B), 218 + part.x , 130 + part.y, 120 * part.tamany, 50 * part.tamany);
            }   
        }
        
        ctxOrig.drawImage(can, -this.canvas.width / 2 , -this.canvas.height / 8, this.canvas.width * 2, this.canvas.height * 2);
        
    }
    
    /**
     * Determina quina part s'ha de pintar i asigna la fila i columna seleccionada
     * @param {String} partName Nom de la part
     * @param {Number} fila     Posicio de la fila
     * @param {Number} col      Posicio de la columna
     */
    this.Draw = function(partName, fila, col) {
        var part = this.miiParts[partName];
        switch(partName) {
            case 'hairs_1':
                part.pintat = true;
                part.fila = fila;
                part.col = col;
                break;
            case 'hairs_2':
                this.miiParts.hairs_1.pintat = false;
                part.pintat = true;
                part.fila = fila;
                part.col = col;
                break;
            case 'eyes_3':
                part.pintat = true;
                part.fila = fila;
                part.col = col;
                this.miiParts.eyes_1.fila = fila;
                this.miiParts.eyes_1.col = col;
                this.miiParts.eyes_2.fila = fila;
                this.miiParts.eyes_2.col = col;
                break;
            default:
                if (fila != -1 && col != -1) {
                    part.pintat = true;
                    part.fila = fila;
                    part.col = col;
                }
                else
                    part.pintat = false;
                break;
        
        }
        
        this.onDraw();
    }
    
    /**
     * Funcio que genera les eines de configuració per a les parts.
     * Aquesta funcio es cridada per el control de menu que genera dinamicament les eines per cada menu.
     * @param {String} menu Nom de la part
     */
    this.loadTools = function(menu) {
        var tl = document.getElementById('tools');
        
        tl.innerHTML = '<button onclick="'+this.varName+'.guardar();" style="float: left;">Exporta Imatge</button><br/>'
        
        switch(menu) {
            case 'heads':
                var colors = ["#feecda", "#fde1c6", "#fccd9e", "#fbb875", "#fbefd9", "#f7dfb3", "#f3d08f", "#f0c26c", "#fdf0d9", "#fad99c", "#f8c972", "#f0c26c", "#f7c6b0", "#f4b69b", "#f3a989", "#ed8152", "#feeceb", "#fde2e0", "#fccbc9", "#fbb0ac", "#e7ad9a", "#e5a893", "#e19982", "#d77757", "#e0bd8d", "#d9ad71", "#faa856", "#f98d22", "#be6205", "#e8b099", "#e09574", "#d97b53", "#d26435", "#af5027", "#9e4823", "#8f411f"];
                var nodeCol = document.createElement('div');
                nodeCol.innerHTML = 'Color de la pell: <input id="colorHead" type="color" value="'+this.miiParts.heads.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'heads\', this.value);"><br/>';
                nodeCol.style.float = 'left';
                for (var i = 0; i < colors.length; i++) {
                    var c = document.createElement('div');
                    c.setAttribute('class', 'color');
                    c.setAttribute('onclick', this.varName+'.canviaColor(\''+menu+'\', \''+colors[i]+'\')');
                    c.style.backgroundColor = colors[i];
                    
                    if (i % 4 == 0 ) { c.style.clear = 'both'; }
                    
                    nodeCol.appendChild(c);
                }
                tl.appendChild(nodeCol);
                break;
                
            case 'eyebrows':
            case 'eyes': 
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                if (menu == 'eyes') {
                    nodeCol.innerHTML = 'Color dels ulls: <input id="colorHair" type="color" value="'+this.miiParts.eyes_2.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'eyes_2\', this.value);"><br/>';
                }
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.separa(\''+menu+'\',1);" class="left"><i class="fa fa-arrow-circle-left"></i><i class="fa fa-arrow-circle-right"></i></button><button onclick="'+this.varName+'.separa(\''+menu+'\',-1);" class="right"><i class="fa fa-arrow-circle-right"></i><i class="fa fa-arrow-circle-left"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.rota(\''+menu+'\',-0.05);" class="left"><i class="fa fa-rotate-left"></i></button><button onclick="'+this.varName+'.rota(\''+menu+'\',0.05);" class="right"><i class="fa fa-rotate-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.amplia(\''+menu+'\',0.01);" class="left"><i class="fa fa-expand"></i></button><button onclick="'+this.varName+'.amplia(\''+menu+'\',-0.01);" class="right"><i class="fa fa-compress"></i></button>';
                
                tl.appendChild(nodeCol);
                break;
                
                
            case 'hair':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML = 'Cabells: <input id="colorHair" type="color" value="'+this.miiParts.hairs_1.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'hairs\', this.value);">';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'lips':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.style.padding = '5px';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.amplia(\''+menu+'\',0.01);" class="left"><i class="fa fa-expand"></i></button><button onclick="'+this.varName+'.amplia(\''+menu+'\',-0.01);" class="right"><i class="fa fa-compress"></i></button>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'noses':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.amplia(\''+menu+'\',0.01);" class="left"><i class="fa fa-expand"></i></button><button onclick="'+this.varName+'.amplia(\''+menu+'\',-0.01);" class="right"><i class="fa fa-compress"></i></button>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'glasses':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                
                nodeCol.innerHTML = 'Color de les ulleres: <input id="colorHairGlasses" type="color" value="'+this.miiParts.glasses.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'glasses\', this.value);"><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'mustache':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML = 'Color del bigoti: <input id="colorMustache" type="color" value="'+this.miiParts.mustache.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'mustache\', this.value);"><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.amplia(\''+menu+'\',0.01);" class="left"><i class="fa fa-expand"></i></button><button onclick="'+this.varName+'.amplia(\''+menu+'\',-0.01);" class="right"><i class="fa fa-compress"></i></button>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'beards':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML = 'Color de la barba: <input id="colorBeard" type="color" value="'+this.miiParts.beards.getHexColor()+'" onchange="'+this.varName+'.canviaColor(\'beards\', this.value);"><br/>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'noses':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.amplia(\''+menu+'\',0.01);" class="left"><i class="fa fa-expand"></i></button><button onclick="'+this.varName+'.amplia(\''+menu+'\',-0.01);" class="right"><i class="fa fa-compress"></i></button>';
                
                tl.appendChild(nodeCol);
                break;
                
            case 'mole':
                var nodeCol = document.createElement('div');
                nodeCol.style.float = 'left';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.puja(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-left"></i></button><button onclick="'+this.varName+'.puja(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-right"></i></button><br/>';
                nodeCol.innerHTML += '<button onclick="'+this.varName+'.mou(\''+menu+'\',-1);" class="left"><i class="fa fa-arrow-circle-o-up"></i></button><button onclick="'+this.varName+'.mou(\''+menu+'\',1);" class="right"><i class="fa fa-arrow-circle-o-down"></i></button><br/>';
                
                tl.appendChild(nodeCol);
                break;
        }
    }
    
    /**
     * Amplia/Redueix la posicio de la peca (Horizontalment)
     * @param {String} menu Nom de la part la cual volem moure
     * @param {Number} p    Decrement/increment que farem.
     */
    this.puja = function(menu, p) {
        switch(menu) {
                
            case 'eyes':
                this.miiParts.eyes_1.x += p;
                this.miiParts.eyes_2.x += p;
                this.miiParts.eyes_3.x += p;
                break;
                
            default:
                this.miiParts[menu].x += p;
                break;
        }
        
        this.onDraw();
    }
    
    /**
     * Amplia/Redueix la posicio de la peca (Horizontalment)
     * @param {String} menu Nom de la part la cual volem moure
     * @param {Number} p    Decrement/increment que farem.
     */
    this.mou = function(menu, p) {
        switch(menu) {
               
            case 'eyes':
                this.miiParts.eyes_1.y += p;
                this.miiParts.eyes_2.y += p;
                this.miiParts.eyes_3.y += p;
                break;
            
            default:
                this.miiParts[menu].y += p;
                break;
        }
        
        this.onDraw();
    }
    
    /**
     * Amplia/Redueix la separació en les peces combinades
     * @param {String} menu Nom de la part la cual volem reduir/ampliar
     * @param {Number} p    Decrement/increment que farem.
     */
    this.separa = function(menu, p) {
        switch(menu) {
                
            case 'eyebrows':
                this.miiParts.eyebrows.separacio += p;
                
                this.miiParts.eyebrows.x -= (p / 2);
                break;
                
            case 'eyes':
                this.miiParts.eyes_1.separacio += p;
                this.miiParts.eyes_2.separacio += p;
                this.miiParts.eyes_3.separacio += p;
                
                this.miiParts.eyes_1.x -= p;
                this.miiParts.eyes_2.x -= p;
                this.miiParts.eyes_3.x -= p;
                break;
        }
        
        this.onDraw();
    }
    
    /**
     * Rota la peca
     * @param {String} menu Nom de la part la cual volem rotar
     * @param {Number} p    Decrement/increment que farem.
     */
    this.rota = function(menu, p) {
        switch(menu) {
                
            case 'eyebrows':
                this.miiParts.eyebrows.angle += p;
                break;
                
            case 'eyes':
                this.miiParts.eyes_1.angle += p;
                this.miiParts.eyes_2.angle += p;
                this.miiParts.eyes_3.angle += p;
                break;
        }
        
        this.onDraw();
    }
    
    /**
     * Amplia/Redueix la peca
     * @param {String} menu Nom de la part la cual volem reduir/ampliar
     * @param {Number} p    Decrement/increment que farem.
     */
    this.amplia = function(menu, p) {
        switch(menu) {
                
            case 'eyes':
                this.miiParts.eyes_1.tamany += p;
                this.miiParts.eyes_2.tamany += p;
                this.miiParts.eyes_3.tamany += p;
                break;
            
            default:
                this.miiParts[menu].tamany += p;
                break;
        }
        
        this.onDraw();
    }
    
    /**
     * Funció per exportar la imatge del Mii
     */
    this.guardar = function() {
        var nom = prompt("Escriu un nom per guardar la imatge (Sense extensio)","mii");
        if (mii != null) {
            var a = document.createElement('a');
            a.setAttribute('download', nom+'.png');
            a.setAttribute('href', this.canvas.toDataURL());
            a.click();
        }
    }
    
    /**
     * Canvia el color de les parts
     * @param {String} part Nom de la part a la que canvia el color
     * @param {String} hex  Color en hexadecimal.
     */
    this.canviaColor = function(part, hex) { ///MODIFICAR AMB EL COLOR DE LES PARTS
        switch(part) {
            case 'heads':
                this.miiParts.heads.setColorHex(hex);
                this.miiParts.noses.setColorHex(hex);
                break;
            case 'hairs':
                this.miiParts.hairs_1.setColorHex(hex);
                this.miiParts.hairs_2.setColorHex(hex);
                this.miiParts.eyebrows.setColorHex(hex);
                break;
            default:
                this.miiParts[part].setColorHex(hex);
        }
        this.onDraw();
    }
    
    /*Funcions privades*/
    
    /**
     * Funcio que genera els menús per a l'aplicacio.
     * @param   {Object} div      Div que contindra els controls generats. Si pasem 'undefinied' per parametre generará un de nou.
     * @param   {Object} part     Part del Mii de la cual volem generar els controls.
     * @param {String} partName Nom de la part del Mii
     * @param   {String} id       ID que se li asignará al div que contindra els controls en cas de que aquest no s'hagi pasat per parametre.
     * @param {String} cName    Nom de la clase de css que utilizará
     * @param {String} varName  Nom de la variable del editor.
     * @param {Boolean} unDraw  Bolea per determinar si ha de afegir un control buit per desseleccionar la part a pintar.
     * @returns {Div} Div que conte tots els controls
     */
    function generaMenus(div, part, partName, id, cName, varName, unDraw) {
        if (div == undefined) { //Si no ens pasen un div el creem nosaltres.
            div = document.createElement('div');
            div.setAttribute('id', id);
        }
        
        if (unDraw) { //Si es true crearem un control null per desactivar la part a pintar.
            var dImg = document.createElement('div');
            dImg.style.width = part.amp+"px";
            dImg.style.height = part.al+"px";
            dImg.setAttribute('class', 'parts '+cName);
            dImg.setAttribute('onclick', varName+'.Draw("'+partName+'",'+(-1)+','+(-1)+')');
            
            div.appendChild(dImg);
        }
        
        generaControls(div ,part ,partName , cName, varName); //Cridem a la funcio per generar els controls.
        return div;
    }
    
    /**
     * Genera els controls de la part pasada per parametre
     * @param {ObjectDOM} div      Div del contenidor on anirán els controls creats
     * @param {ObjectPart}   part     Part del Mii.
     * @param {String} partName Nom de la part del Mii
     * @param {String} cName    Nom de la clase de css que utilizará
     * @param {String} varName  Nom de la variable del editor.
     */
    function generaControls(div, part, partName, cName, varName) {
        for (var i = 0; i <= part.limit.F; i++) {
            for (var j = 0; j <= part.limit.C; j++) {
                var dImg = document.createElement('div');
                dImg.style.width = part.amp+"px";
                dImg.style.height = part.al+"px";
                dImg.setAttribute('class', 'parts '+cName);
                dImg.setAttribute('onclick', varName+'.Draw("'+partName+'",'+i+','+j+')');
                
                dImg.style.backgroundImage = 'url("'+part.imgName+'")';
                dImg.style.backgroundPositionX = (-part.amp * j)+"px";
                dImg.style.backgroundPositionY = (-part.al * i)+"px";
                
                div.appendChild(dImg);
            }
        }
    }
    
    /**
     * Funcio que composa les parts del mii que necesiten ser 2 com els ulls i les urelles.
     * @param   {ObjectPart}   part  Part del Mii
     * @param   {Number} espai Pixels de separacio que hi haura entre les dues parts composades
     * @returns {Canvas} Retorna la imatge composada.
     */
    function compositeMirror(part, espai) {
        var canMirr = document.createElement('canvas');
        canMirr.setAttribute('width', (part.amp * 2) + espai + part.separacio); //Fem un nou canvas que contindra els dos elements
        canMirr.setAttribute('height', part.al);
        var mCtx = canMirr.getContext('2d');
        var p = rotateImatge(part.img, part.amp, part.al, part.fila, part.col, part.angle); //Cridem a la funcio de rotar imatge
        var pInv = mirrorImatge(p, part.amp, part.al); //Un cop tenim la imatge rotada li fem l'efecte mirall
        mCtx.drawImage(pInv,0,0); //I les dibuixem aplicant un marge de espai
        mCtx.drawImage(p,part.amp + espai + part.separacio,0);
        
        return canMirr;
    }
    
    /**
    *Funcio que serveix per canviar el color de un canvas.
    *@param {canvas} Imatge original a la que se le vol canviar el color.
    *@param {Integer} Color RGB Vermell
    *@param {Integer} Color RGB Verd
    *@param {Integer} Color RGB Blau
    *@return {canvas} La imatge modificada
    */
    function canviaColor(img, r, g, b) {
        
        //var c = retallaImatge(img, amp, al, fila, col);
        var ctx = img.getContext('2d');
        
        var imDat = ctx.getImageData(0,0, img.width, img.height); //Agafem les dades de la imatge
        var i = 0;
        while (i < imDat.data.length) { //Canviem el color de tots els pixels
            if (imDat.data[i+3] != 0) { //Ens saltem els pixels amb alpha 0
                imDat.data[i] = imDat.data[i] - (255 - r);//RED
                imDat.data[i+1] = imDat.data[i+1] - (255 - g);//GREEN
                imDat.data[i+2] = imDat.data[i+2] - (255 - b);//BLUE
            }
            i = i + 4;
        }
        
        ctx.clearRect(0, 0, img.width, img.height); //Netejem el canvas.
        ctx.putImageData(imDat, 0, 0); //Posem les dades de la imatge repintada de nou al canvas.

        return img;
    }
    
    /**
     * Rota la imatge pasada per parametre
     * @param   {Object} img   Imatge de la part a rotar
     * @param   {Number} amp   Amplada de la imatge
     * @param   {Number} al    Alçada de la imatge
     * @param   {Number} fila  Fila de la part seleccionada
     * @param   {Number} col   Columna de la part seleccionada
     * @param   {Number} angle Angle en radians que rotarem
     * @returns {Canvas} Canvas amb la imatge rotada.
     */
    function rotateImatge(img, amp, al, fila, col, angle) {
        var c = document.createElement('canvas');
        c.setAttribute('width', amp);
        c.setAttribute('height', al);

        var ctx = c.getContext('2d');
        ctx.save(); //Guardem el estat del context
        ctx.translate(amp / 2, al / 2); // Fem una translacio del punt de origen del context al centre del canvas.
        ctx.rotate(angle); //Rotem el canvas tinguent com eix el centre.
        ctx.drawImage(retallaImatge(img, amp, al, fila, col), -amp / 2, -al / 2, amp, al); //dibuixem la imatge al canvas
        ctx.restore(); //Restaurem el estat del context.
        
        return c;
    }
    
    /**
     * Funcio que fa efecte mirall en una imatge que li pasem per parametre
     * @param   {Object} img Imatge la cual volem invertir
     * @param   {Number} amp Amplada de la imatge
     * @param   {Number} al  Alçada de la imatge
     * @returns {Canvas} Canvas de la imatge invertida.
     */
    function mirrorImatge(img, amp, al) {
        var c = document.createElement('canvas');
        c.setAttribute('width', amp);
        c.setAttribute('height', al);
        var cInv = c.getContext('2d');
        cInv.translate(amp / 2, al / 2); //Fem una translacio de el punt de origen al centre de la imatge.
        cInv.scale(-1,1); //Fem un scale() posant negatiu el punt de les X per tal de invertirlo.
        
        cInv.drawImage(img, -amp / 2, -al / 2, amp, al); //Dibuixem la imatge.
        
        return c;
    }
    
    /**
     * Retalla la imatge de la part desitjada del mapa de imatge
     * @param   {Object} img  Imatge la cual volem retallar
     * @param   {Number} amp  Mida de la amplada a retallar
     * @param   {Number} al   Mida de la alçada a retallar
     * @param   {Number} fila Posicio de la fila a retallar
     * @param   {Number} col  Posicio de la columna a retallar
     * @returns {Canvas} Canvas amb la imatge retallada.
     */
    function retallaImatge(img, amp, al, fila, col) {
        var c = document.createElement('canvas');
        c.setAttribute('width', amp);
        c.setAttribute('height', al);

        var ctx = c.getContext('2d');
        //imatge | posicio clip imatgeX | posicio clip imatgeY | tamany X imatge | posicio x al canvas | posicio y al canvas | tamany imatge(scale) | tamany imatge (sacle)
        ctx.drawImage(img,(amp * col),(al * fila), amp, al,0,0,amp,al);
        return c;
    }
}