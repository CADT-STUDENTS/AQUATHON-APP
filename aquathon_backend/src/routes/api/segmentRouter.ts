import { Router } from "express"
import SegmentController from "../../controllers/SegmentController";

const router = Router();

/**
 * @swagger
 * /api/races/{raceId}/segment:
 *   get:
 *     summary: Retrieve all segments for a specific race
 *     tags:
 *       -  Segments
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: The ID of the race
 *     responses:
 *       200:
 *         description: A list of segments for the specified race
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *       404:
 *         description: Race not found
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     Segment:
 *       type: object
 *       required:
 *         - id
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the segment
 *         type:
 *           type: string
 *           enum: [swimming, running]
 *           description: The type of the segment
 *         distance:
 *           type: number
 *           description: The distance of the segment (optional)
 *         order:
 *           type: number
 *           description: The order of the segment in the race (optional)
 */
router.get("/:raceId/segment", SegmentController.getAllSegments)

/**
 * @swagger
 * /api/races/{raceId}/segment/{segmentId}:
 *   get:
 *     summary: Retrieve all participant for segment
 *     tags:
 *       -  Segments
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: The ID of the race
 *       - in: path
 *         name: segmentId
 *         required: true
 *         description: timeRaceConfig ID of races
 *     responses:
 *       200:
 *         description: A list of segments for the specified race
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *       404:
 *         description: Race not found
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     Segment:
 *       type: object
 *       required:
 *         - id
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the segment
 *         type:
 *           type: string
 *           enum: [swimming, running]
 *           description: The type of the segment
 *         distance:
 *           type: number
 *           description: The distance of the segment (optional)
 *         order:
 *           type: number
 *           description: The order of the segment in the race (optional)
 */
router.get("/:raceId/segment/:segmentId", SegmentController.getParticipantSegment)
export default router;