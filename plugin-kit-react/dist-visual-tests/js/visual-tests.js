initJs = () => {
    // Selectize
    const $selectize = $('.selectize').selectize();

    // Custom Selects (menubtn)
    const $customSelects = $('.custom-select');

    $customSelects.each((index, element) => {
        const $container = $(element);
        const $button = $container.find('.menubtn');
        const $buttonFlex = $button.find('.inline-flex:first');
        const menubtn = $button.menubtn().data('menubtn');

        if (menubtn) {
            menubtn.on('optionSelect', (ev) => {
                const $option = $(ev.option);
                const $icon = $option.find('.icon');
                const $label = $option.find('.label');
                let labelHtml = '';

                if ($icon.length) {
                    labelHtml += $icon.clone().removeClass('icon').addClass('cp-icon').prop('outerHTML');
                }

                labelHtml += `<div class="label">${$label.html()}</div>`;
                $buttonFlex.html(labelHtml);
                menubtn.menu.$options.removeClass('sel');
                $option.addClass('sel');
                $container.data('value', $option.data('value'));
                $container.trigger('change');
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initJs();

    const observer = new MutationObserver(() => {
        initJs();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
    });
});
