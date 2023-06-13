import readAllNotes, { Note } from './readAllNotes';

const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

const replaceAll = (str, find, replace) =>
    str.replace(new RegExp(escapeRegExp(find), 'g'), replace);


const escape = (input: string) =>
    replaceAll(
        replaceAll(input, `\\`, `\\`),
        `"`,
        `\\"`
    )

export const formatMarkdownNotesAsDotFile = (
    notes: Record<string, Note>,
): string => {
    const nodes = Object.entries(notes).map(
        ([_, note]) => `  "${escape(note.title)}" [ label = "${escape(note.title)}"];`,
    );
    const edges = Object.entries(notes).flatMap(
        ([_, note]) => note.links.map(
            (link) => `  "${escape(note.title)}" -> "${escape(link.targetTitle)}";`,
        ),
    );

    return `\
digraph notegraph {
${nodes.join('\n')}

${edges.join('\n')}
}
`;
};

export const exportMarkdownNotesAsDotFile = async (baseNotePath: string) => {
    const notes = await readAllNotes(baseNotePath);
    console.log(formatMarkdownNotesAsDotFile(notes));
};
