//Script starts here -- Made with \u2764\uFE0F by Niraj Wadile
let output = document.querySelector("#output");
let runBtn = document.querySelector("#run-btn");
let compileBtn = document.querySelector("#compile-btn");

const codemirrorEditor = CodeMirror.fromTextArea(
	document.querySelector("#codearea"),
	{
		lineNumbers: true,
		mode: "python",
		theme: "base16-dark",
	}
);

//Default value in code editor
codemirrorEditor.setValue(`print("This is an online Python compiler and interpreter")\nprint("It's Simple and Secure...SecSi(Sexy)\\U0001F605")\nprint("Made with \u2764\uFE0F by Niraj Wadile")`)

function makeOut(s){
	console.log(s);
	output.innerHTML = s;
}

runBtn.addEventListener("click", (e) => {
	let pycode = codemirrorEditor.getValue();
	output.innerHTML = "";
	runPython(pycode);
})

compileBtn.addEventListener("click", (e) => {
    let pycode = codemirrorEditor.getValue();
    output.innerHTML = "";
    compilePython(pycode);
    
})


let startcode = `
import sys, io, traceback
namespace = {}  # use separate namespace to hide run_code, modules, etc.
def run_code(code):
    """run specified code and return stdout and stderr"""
    out = io.StringIO()
    oldout = sys.stdout
    olderr = sys.stderr
    sys.stdout = sys.stderr = out
    try:
        # change next line to exec(code, {}) if you want to clear vars each time
        exec(code, {})
    except:
        traceback.print_exc()

    sys.stdout = oldout
    sys.stderr = olderr
    return out.getvalue()

def compile_code(code):
    """run specified code and return stdout and stderr"""
    out = io.StringIO()
    oldout = sys.stdout
    olderr = sys.stderr
    sys.stdout = sys.stderr = out
    try:
        # change next line to exec(code, {}) if you want to clear vars each time
        x = compile(code,'test','exec')
        print("Synatax is Okay!")
    except:
        traceback.print_exc()

    sys.stdout = oldout
    sys.stderr = olderr
    return out.getvalue()
`
function setup_pyodide(startcode) {
	// setup pyodide environment to run code blocks as needed
	pyodide.runPython(startcode)
  }

languagePluginLoader.then(() => {
	// Pyodide is now ready to use...
	setup_pyodide(startcode)
	pyodide.globals.code_to_run = `print("This is an online Python compiler and interpreter")\nprint("It's Simple and Secure...SecSi(Sexy)\\U0001F605")\nprint("Made with \u2764\uFE0F by Niraj Wadile")`;
	makeOut(pyodide.runPython(`run_code(code_to_run)`));
  });


function runPython(pycode) {
// run code currently stored in editor
	pyodide.globals.code_to_run = pycode
	makeOut(pyodide.runPython('run_code(code_to_run)'))
}

function compilePython(pycode) {
// run code currently stored in editor
	pyodide.globals.code_to_run = pycode
	makeOut(pyodide.runPython('compile_code(code_to_run)'))
}

function evaluatePython(pycode) {
	pyodide.runPythonAsync(pycode)
    .then(output => makeOut(output))
    .catch((err) => { makeOut(err) });
}
//Script Ends Here -- Made with \u2764\uFE0F by Niraj Wadile