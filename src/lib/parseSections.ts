
export type DocumentSection = {
  id: number
  title: string
  content: string
}

export function parseSections(text: string) {
  const sections: DocumentSection[] = [];
  let current = { title: "Intro", lines: [] as string[] }

  const flush = () => {
    const content = current.lines.join("\n").trim();

    if(content) {
      sections.push({id: sections.length, title: current.title, content })
    }
  }

  for(const line of text.split(/\r?\n/)) {
    if(line.startsWith('## ')) {
      flush()
      current = { title: line.slice(3).trim(), lines: [] }
    } else {
      current.lines.push(line);
    }
  }

  flush()

  return sections;
}