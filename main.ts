import { Plugin, MarkdownPostProcessorContext, Notice } from 'obsidian';

const COPY_SUCCESS_MESSAGE = "Code copied";

export default class AltClickToCopy extends Plugin {
	onload(): void {
		this.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => this.processMarkdown(el, ctx));
	}

	processMarkdown(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const codeBlocks = el.querySelectorAll('code');


		codeBlocks.forEach(block => {
			block.addEventListener('click', this.handleCodeBlockClick.bind(this));
		});
	}

	handleCodeBlockClick(event: MouseEvent) {
		if (event.altKey) {
			const blockContent = (event.target as HTMLElement).textContent;
			navigator.clipboard.writeText(blockContent || '');
			new Notice(COPY_SUCCESS_MESSAGE);
		}
	}
}