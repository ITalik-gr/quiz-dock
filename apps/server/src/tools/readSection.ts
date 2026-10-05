import type { toolType } from "../agent/core.js";
import type { DocumentSection } from "../lib/parseSections.js";


export function makeReadSection({ sections }: { sections: DocumentSection[]}): toolType {

  return {
    name: "readSection",
    description: `
      Returns the full text of one section of the document by its ID.
      The list of available sections with their IDs is provided in the system prompt; use only IDs from that list.
      Call this before answering any question about the document's content: do not answer from memory or general knowledge, the document may differ from what you know.
      If the answer might span several sections, call this tool once for each relevant section.
      Returns the section title followed by its content. If the ID does not exist, returns an error listing the valid IDs.
    `,
    input_schema: {
      type: "object",
      properties: {
        sectionId: {
          type: "integer",
          description: "ID of the section to read, exactly as shown in the section list, e.g. 3.",
        }
      },
      required: ['sectionId'],
    },
    run: async (input: unknown) => {

      if (typeof input !== "object" || input === null || !("sectionId" in input) || typeof input.sectionId !== "number") {
        throw new Error('Invalid input: expected { sectionId: integer }')
      }

      const res = sections.find((item) => item.id === input.sectionId);

      if(!res) {
        throw new Error(`Section with id ${input.sectionId} not found. Valid ids: ${sections[0]?.id} - ${sections[sections.length - 1]?.id}`)
      }

      return `
        ## ${res.title}\n\n${res.content}
      `;
    }
  }
}