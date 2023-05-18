export interface CourseModel {
  organisationId: number;
  courseName: string;
  courseCategoryId: number;
  courseDescription: string;
  courseDuration: number;
  courseLevel: string;
  courseFees: number;
  enrollment: number;
  prerequisites: string;
  instructorIds: number[];
  courseFormat: string;
  startDate: string;
  endDate: string;
}
