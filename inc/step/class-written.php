<?php
/**
 * Class CoursePress_Step_Written
 *
 * @since 3.0
 * @package CoursePress
 */
class CoursePress_Step_Written extends CoursePress_Step {
	protected $type = 'written';

	protected function get_keys() {
		$keys = parent::get_keys();
		array_push( $keys, 'placeholder_text', 'options' );

		return $keys;
	}

	function get_question() {
		$templates = '';
		$unit = $this->get_unit();
		$course_id = $unit->__get( 'course_id' );
		$unit_id = $unit->__get( 'ID' );
		$step_id = $this->__get( 'ID' );
		$options = $this->__get( 'options' );
		$type = $this->__get( 'module_type' );

		// Legacy call
		$legacy_types = array( 'input-textarea', 'input-text', 'text_input_module' );

		if ( in_array( $type, $legacy_types ) ) {
			$options[] = array(
				'question' => '',
				'placeholder_text' => $this->__get( 'placeholder_text' ),
				'word_limit' => 0,
			);
		}

		foreach ( $options as $index => $option ) {
			$template = '';

			if ( ! empty( $option['question'] ) ) {
				$question = apply_filters( 'the_content', $option['question'] );
				$template .= $this->create_html( 'div', array( 'class' => 'question' ), $question );
			}
			$name = sprintf( 'module[%d][%d][%d][%d]', $course_id, $unit_id, $step_id, $index );
			$attr = array(
				'name' => $name,
				'class' => 'course-step-written',
				'data-limit' => (int) $option['word_limit'],
				'placeholder' => $option['placeholder_text'],
			);

			$template .= $this->create_html( 'textarea', $attr );
			$templates .= $this->create_html( 'div', array(), $template );
		}

		return $templates;
	}
}