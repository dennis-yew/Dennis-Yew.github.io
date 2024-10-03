const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    console.error("Failed to get WebGL context.");
}

let spriteTexture; // 全局变量

function loadTexture(gl, url, callback) {
    const texture = gl.createTexture();
    const image = new Image();
    image.src = url;
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        callback(texture); // 纹理加载完成后调用回调
    };
    return texture;
}

function loadAtlas(atlasPath, callback) {
    fetch(atlasPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(atlasData => {
            callback(atlasData);
        })
        .catch(error => console.error('Error loading atlas:', error));
}

function loadSpineJSON(jsonPath, callback) {
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            callback(jsonData);
        })
        .catch(error => console.error('Error loading Spine JSON:', error));
}

function init() {
    loadTexture(gl, '/assets/img/Sigewinne.png', (texture) => {
        spriteTexture = texture; // 保存纹理
        console.log('Texture loaded:', spriteTexture);
        
        loadAtlas('/assets/js/xgw.yaml', (atlasData) => {
            console.log('Atlas Data:', atlasData);
            loadSpineJSON('/assets/js/atlas.json', (spineData) => {
                console.log('Spine Data:', spineData);
                drawScene(); // 确保在所有数据加载完成后绘制
            });
        });
    });
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
}

// 假设你有顶点着色器和片段着色器的源码
const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;

    void main() {
        gl_Position = a_position;
        v_texCoord = a_texCoord;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;

    void main() {
        gl_FragColor = texture2D(u_texture, v_texCoord);
    }
`;

// 创建着色器程序
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

// 创建并使用着色器程序
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// 定义矩形的顶点和纹理坐标
const positions = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
    -0.5,  0.5,
     0.5,  0.5,
]);

const texCoords = new Float32Array([
    0, 1,
    1, 1,
    0, 0,
    1, 0,
]);

// 创建缓冲区并传送顶点数据
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

// 获取属性的位置
const positionLocation = gl.getAttribLocation(program, 'a_position');
const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

// 启用属性
gl.enableVertexAttribArray(positionLocation);
gl.enableVertexAttribArray(texCoordLocation);

// 将缓冲区绑定到属性上
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

// 绘制场景
function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if (spriteTexture) {
        gl.bindTexture(gl.TEXTURE_2D, spriteTexture);
        
        // 绘制矩形
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    console.log("Drawing the scene with current settings.");
}


init();
