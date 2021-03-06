import { Message } from "discord.js"

type Validation = (response: Message | undefined) => boolean

export class SetupStep {
	question: string
	warning: string
	required: boolean
	private validation: Validation

	constructor(question: string, warning: string, validation: Validation, required: boolean) {
		this.question = question
		this.warning = warning
		this.validation = validation
		this.required = required
	}

	public skipped(response: Message | undefined): boolean {
		return response && response.content.toLowerCase() === 'skip' ? true : false
	}

	public validate(response: Message | undefined): boolean {
		if (this.validation) return this.validation(response)
		else return true
	}
}