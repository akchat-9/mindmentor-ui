export interface AssignmentModel {
    organisationId: number
    title: string
    courseId: number
    instructorId: number
    maxPoint: number
    fileTypeAllowed: string
    maxFileSize: number
    dueDate: string
    fileName: string
    assignmentType: string
}