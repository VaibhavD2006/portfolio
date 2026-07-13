interface Token {
  type: string
  text: string
}

type Line = Token[]

function tokenizePython(code: string): Line[] {
  return code.split('\n').map((line) => {
    const tokens: Token[] = []
    let rest = line

    // Very lightweight tokenizer for display purposes
    while (rest.length > 0) {
      // Comment
      if (rest.startsWith('#')) {
        tokens.push({ type: 'comment', text: rest })
        rest = ''
        continue
      }
      // Magic / bash
      if (rest.startsWith('%%')) {
        const m = rest.match(/^(%%\w+)(.*)/)
        if (m) {
          tokens.push({ type: 'magic', text: m[1] })
          rest = m[2]
          continue
        }
      }
      // echo command
      if (rest.match(/^echo\s/)) {
        const m = rest.match(/^(echo)(\s+)(.*)/)
        if (m) {
          tokens.push({ type: 'bash-cmd', text: m[1] })
          tokens.push({ type: 'param', text: m[2] })
          rest = m[3]
          continue
        }
      }
      // String (double or single quoted)
      const strMatch = rest.match(/^(["'])([^"']*)\1/)
      if (strMatch) {
        tokens.push({ type: 'string', text: strMatch[0] })
        rest = rest.slice(strMatch[0].length)
        continue
      }
      // Keywords
      const kwMatch = rest.match(/^(from|import|class|def|return|True|False|None|if|else|for|in|not|and|or|with|as)\b/)
      if (kwMatch) {
        tokens.push({ type: 'keyword', text: kwMatch[0] })
        rest = rest.slice(kwMatch[0].length)
        continue
      }
      // Decorator
      if (rest.startsWith('@')) {
        const m = rest.match(/^(@\w+)/)
        if (m) {
          tokens.push({ type: 'decorator', text: m[1] })
          rest = rest.slice(m[1].length)
          continue
        }
      }
      // Number
      const numMatch = rest.match(/^\d+(\.\d+)?/)
      if (numMatch) {
        tokens.push({ type: 'number', text: numMatch[0] })
        rest = rest.slice(numMatch[0].length)
        continue
      }
      // Function call
      const funcMatch = rest.match(/^(\w+)(\s*\()/)
      if (funcMatch) {
        tokens.push({ type: 'func', text: funcMatch[1] })
        tokens.push({ type: 'param', text: '(' })
        rest = rest.slice(funcMatch[1].length + 1)
        continue
      }
      // Class/type name (uppercase start)
      const classMatch = rest.match(/^([A-Z]\w*)/)
      if (classMatch) {
        tokens.push({ type: 'class', text: classMatch[0] })
        rest = rest.slice(classMatch[0].length)
        continue
      }
      // Default: consume one char
      tokens.push({ type: 'param', text: rest[0] })
      rest = rest.slice(1)
    }
    return tokens
  })
}

interface CodeInputProps {
  code: string
  type?: 'code' | 'bash'
}

const tokenClass: Record<string, string> = {
  keyword: 'token-keyword',
  string: 'token-string',
  number: 'token-number',
  comment: 'token-comment',
  class: 'token-class',
  func: 'token-func',
  param: 'token-param',
  decorator: 'token-decorator',
  magic: 'token-magic',
  'bash-cmd': 'token-bash-cmd',
  'bash-str': 'token-bash-str',
}

export function CodeInput({ code }: CodeInputProps) {
  const lines = tokenizePython(code)

  return (
    <div
      className="flex-1 rounded-t font-mono text-[12.5px] leading-[1.65] overflow-x-auto"
      style={{
        background: 'var(--nb-cell-bg)',
        color: 'var(--nb-text)',
        padding: '10px 14px',
        borderTop: '1px solid var(--nb-border)',
        borderLeft: '1px solid var(--nb-border)',
        borderRight: '1px solid var(--nb-border)',
        borderRadius: '4px 4px 0 0',
      }}
    >
      <pre className="m-0">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.65em]">
            {line.length === 0 ? (
              <span>&nbsp;</span>
            ) : (
              line.map((tok, j) => (
                <span key={j} className={tokenClass[tok.type] ?? ''}>
                  {tok.text}
                </span>
              ))
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}
