import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const ZOOM_FACTOR = 0.35
const BASE_WAVE_AMPLITUDE = 0.22
const RANDOM_WAVE_FACTOR = 0.15
const WAVE_FREQUENCY = 3.5
const TIME_FACTOR = 0.22
const BASE_SWIRL_STRENGTH = 1.0
const SWIRL_TIME_MULT = 4.0
const NOISE_SWIRL_FACTOR = 0.18
const FBM_OCTAVES = 8

// Violet & lilac gradient palette
const rectangle3Colors = [
	[0.08, 0.05, 0.22],
	[0.12, 0.08, 0.3],
	[0.16, 0.1, 0.38],
	[0.21, 0.13, 0.46],
	[0.26, 0.16, 0.54],
	[0.32, 0.2, 0.62],
	[0.38, 0.24, 0.7],
	[0.44, 0.29, 0.78],
	[0.48, 0.33, 0.85],
	[0.54, 0.38, 0.9],
	[0.6, 0.44, 0.94],
	[0.66, 0.51, 0.96],
	[0.72, 0.58, 0.97],
	[0.78, 0.66, 0.98],
	[0.83, 0.74, 0.98],
	[0.88, 0.81, 0.99],
	[0.92, 0.87, 0.99],
	[0.95, 0.91, 1.0],
	[0.97, 0.94, 1.0],
	[0.99, 0.97, 1.0],
]

function buildFragmentShader(colors: number[][] = rectangle3Colors): string {
	const fbmOctavesInt = Math.floor(FBM_OCTAVES)
	const colorArraySrc = colors
		.map(
			(c) => `vec3(${c[0].toFixed(3)}, ${c[1].toFixed(3)}, ${c[2].toFixed(3)})`,
		)
		.join(",\n  ")

	return `#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;

#define NUM_COLORS ${colors.length}

vec3 paletteColors[NUM_COLORS] = vec3[](
  ${colorArraySrc}
);

// Perlin-like noise
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float noise2D(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) +
    i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.792843 - 0.853734 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

// Fractional Brownian Motion
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float freq = 1.0;
  for (int i = 0; i < ${fbmOctavesInt}; i++) {
    value += amplitude * noise2D(st * freq);
    freq *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  uv *= float(${ZOOM_FACTOR});

  float t = uTime * float(${TIME_FACTOR});

  float waveAmp = float(${BASE_WAVE_AMPLITUDE}) + float(${RANDOM_WAVE_FACTOR})
                  * noise2D(vec2(t, 27.7));

  float waveX = waveAmp * sin(uv.y * float(${WAVE_FREQUENCY}) + t);
  float waveY = waveAmp * sin(uv.x * float(${WAVE_FREQUENCY}) - t);
  uv.x += waveX;
  uv.y += waveY;

  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float swirlStrength = float(${BASE_SWIRL_STRENGTH})
                        * (1.0 - smoothstep(0.0, 1.0, r));

  angle += swirlStrength * sin(uTime + r * float(${SWIRL_TIME_MULT}));
  uv = vec2(cos(angle), sin(angle)) * r;

  float n = fbm(uv);

  float swirlEffect = float(${NOISE_SWIRL_FACTOR})
                      * sin(t + n * 3.0);
  n += swirlEffect;

  float noiseVal = 0.5 * (n + 1.0);

  float idx = clamp(noiseVal, 0.0, 1.0) * float(NUM_COLORS - 1);
  int iLow = int(floor(idx));
  int iHigh = int(min(float(iLow + 1), float(NUM_COLORS - 1)));
  float f = fract(idx);

  vec3 colLow = paletteColors[iLow];
  vec3 colHigh = paletteColors[iHigh];
  vec3 color = mix(colLow, colHigh, f);

  outColor = vec4(color, 1.0);
}
`
}

const vertexShaderSource = `#version 300 es
precision mediump float;

in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

function createShaderProgram(
	gl: WebGL2RenderingContext,
	vsSource: string,
	fsSource: string,
): WebGLProgram | null {
	const vertexShader = gl.createShader(gl.VERTEX_SHADER)
	if (!vertexShader) return null

	gl.shaderSource(vertexShader, vsSource)
	gl.compileShader(vertexShader)
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader))
		gl.deleteShader(vertexShader)
		return null
	}

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	if (!fragmentShader) {
		gl.deleteShader(vertexShader)
		return null
	}

	gl.shaderSource(fragmentShader, fsSource)
	gl.compileShader(fragmentShader)
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader))
		gl.deleteShader(vertexShader)
		gl.deleteShader(fragmentShader)
		return null
	}

	const program = gl.createProgram()
	if (!program) {
		gl.deleteShader(vertexShader)
		gl.deleteShader(fragmentShader)
		return null
	}

	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(
			"Could not link WebGL program:",
			gl.getProgramInfoLog(program),
		)
		gl.deleteShader(vertexShader)
		gl.deleteShader(fragmentShader)
		gl.deleteProgram(program)
		return null
	}

	return program
}

export interface WavyBackgroundProps {
	children?: React.ReactNode
	className?: string
	colors?: number[][]
}

export default function WavyBackground({
	children,
	className,
	colors = rectangle3Colors,
}: WavyBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const fsSource = buildFragmentShader(colors)
		const gl = canvas.getContext("webgl2", { alpha: true })
		if (!gl) {
			console.warn("WebGL2 is not supported in this environment.")
			return
		}

		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
		gl.clearColor(0, 0, 0, 0)

		const updateSize = () => {
			const container = containerRef.current || canvas.parentElement
			const w = container ? container.clientWidth : window.innerWidth
			const h = container ? container.clientHeight : window.innerHeight
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = Math.max(1, w)
				canvas.height = Math.max(1, h)
				gl.viewport(0, 0, canvas.width, canvas.height)
			}
		}

		updateSize()

		const program = createShaderProgram(gl, vertexShaderSource, fsSource)
		if (!program) return

		gl.useProgram(program)

		const quadVertices = new Float32Array([
			-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
		])
		const vao = gl.createVertexArray()
		gl.bindVertexArray(vao)

		const vbo = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
		gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW)

		const aPositionLoc = gl.getAttribLocation(program, "aPosition")
		gl.enableVertexAttribArray(aPositionLoc)
		gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0)

		const uResolutionLoc = gl.getUniformLocation(program, "uResolution")
		const uTimeLoc = gl.getUniformLocation(program, "uTime")

		const startTime = performance.now()
		let animId: number | null = null
		let isVisible = true

		const io = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0]?.isIntersecting ?? true
			},
			{ threshold: 0.05 },
		)
		if (containerRef.current) {
			io.observe(containerRef.current)
		}

		function render() {
			if (isVisible && !document.hidden) {
				const currentTime = performance.now()
				const elapsed = (currentTime - startTime) * 0.001

				updateSize()

				gl?.viewport(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)
				gl?.clear(gl.COLOR_BUFFER_BIT)

				gl?.useProgram(program)
				gl?.bindVertexArray(vao)

				gl?.uniform2f(uResolutionLoc, canvas?.width ?? 0, canvas?.height ?? 0)
				gl?.uniform1f(uTimeLoc, elapsed)

				gl?.drawArrays(gl.TRIANGLES, 0, 6)
			}
			animId = requestAnimationFrame(render)
		}

		render()

		window.addEventListener("resize", updateSize)
		const ro =
			typeof ResizeObserver !== "undefined" && containerRef.current
				? new ResizeObserver(updateSize)
				: null
		if (ro && containerRef.current) {
			ro.observe(containerRef.current)
		}

		return () => {
			if (animId !== null) cancelAnimationFrame(animId)
			window.removeEventListener("resize", updateSize)
			if (ro) ro.disconnect()
			io.disconnect()
			gl.deleteProgram(program)
			gl.deleteBuffer(vbo)
			gl.deleteVertexArray(vao)
		}
	}, [colors])

	return (
		<div
			ref={containerRef}
			className={cn("relative w-full overflow-hidden", className)}
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full pointer-events-none"
				style={{ background: "transparent" }}
			/>
			{children}
		</div>
	)
}
export { WavyBackground }
