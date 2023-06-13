import readAllNotes, { Note } from './readAllNotes';


export const formatMarkdownNotesAsDotFile = (
    notes: Record<string, Note>,
): string => {
    const nodes = Object.entries(notes).map(
        ([_, note]) => `  "${note.title}" [ label = "${note.title}"];`,
    );
    const edges = Object.entries(notes).flatMap(
        ([_, note]) => note.links.map(
            (link) => `  "${note.title}" -> "${link.targetTitle}";`,
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
