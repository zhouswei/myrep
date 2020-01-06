// Generated code from Butter Knife. Do not modify!
package com.yushi.chekong;

import android.view.View;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Finder;
import butterknife.internal.ViewBinder;
import java.lang.IllegalStateException;
import java.lang.Object;
import java.lang.Override;

public class SecuryActivity$$ViewBinder<T extends SecuryActivity> implements ViewBinder<T> {
  @Override
  public Unbinder bind(final Finder finder, final T target, Object source) {
    InnerUnbinder unbinder = createUnbinder(target);
    View view;
    view = finder.findRequiredView(source, 2131165274, "field 'inputId'");
    target.inputId = finder.castView(view, 2131165274, "field 'inputId'");
    view = finder.findRequiredView(source, 2131165264, "field 'gridViewId'");
    target.gridViewId = finder.castView(view, 2131165264, "field 'gridViewId'");
    view = finder.findRequiredView(source, 2131165369, "field 'tvTitleId'");
    target.tvTitleId = finder.castView(view, 2131165369, "field 'tvTitleId'");
    view = finder.findRequiredView(source, 2131165239, "field 'commitId' and method 'onViewClicked'");
    target.commitId = finder.castView(view, 2131165239, "field 'commitId'");
    unbinder.view2131165239 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked();
      }
    });
    view = finder.findRequiredView(source, 2131165364, "field 'titleLanId'");
    target.titleLanId = finder.castView(view, 2131165364, "field 'titleLanId'");
    view = finder.findRequiredView(source, 2131165217, "field 'backId' and method 'onView1Clicked'");
    target.backId = finder.castView(view, 2131165217, "field 'backId'");
    unbinder.view2131165217 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onView1Clicked();
      }
    });
    view = finder.findRequiredView(source, 2131165282, "field 'lineId'");
    target.lineId = finder.castView(view, 2131165282, "field 'lineId'");
    view = finder.findRequiredView(source, 2131165341, "field 'spannerId'");
    target.spannerId = finder.castView(view, 2131165341, "field 'spannerId'");
    return unbinder;
  }

  protected InnerUnbinder<T> createUnbinder(T target) {
    return new InnerUnbinder(target);
  }

  protected static class InnerUnbinder<T extends SecuryActivity> implements Unbinder {
    private T target;

    View view2131165239;

    View view2131165217;

    protected InnerUnbinder(T target) {
      this.target = target;
    }

    @Override
    public final void unbind() {
      if (target == null) throw new IllegalStateException("Bindings already cleared.");
      unbind(target);
      target = null;
    }

    protected void unbind(T target) {
      target.inputId = null;
      target.gridViewId = null;
      target.tvTitleId = null;
      view2131165239.setOnClickListener(null);
      target.commitId = null;
      target.titleLanId = null;
      view2131165217.setOnClickListener(null);
      target.backId = null;
      target.lineId = null;
      target.spannerId = null;
    }
  }
}
